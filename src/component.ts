import ts, {SyntaxKind} from "typescript";

function transformer(modifier: ts.Decorator, node: ts.MethodDeclaration, sourceFile: ts.SourceFile): ts.Expression[] {
    const decoratorExpression = modifier.expression as ts.CallExpression;
    const scopeArg = decoratorExpression.arguments?.[0];
    // 获取属性的类型
    const length = node.body.statements.length;
    const lastStatement = node.body.statements[length - 1];
    let type;
    if (ts.isReturnStatement(lastStatement)) {
        // 返回new表达式
        if (ts.isNewExpression(lastStatement.expression)) {
            const typeName = lastStatement.expression.expression.getText(sourceFile);
            if (['String', "Number", "Boolean", "Object", "Array", "Function", "Symbol"].indexOf(typeName) === -1) {
                type = typeName
            }
        } else if (ts.isIdentifier(lastStatement.expression)) {
            const identifier = lastStatement.expression.text;
            for (let line = length - 2; line >= 0; line--) {
                // 从下往上找 const identifier = new XXXX(); 的语句
                const state = node.body.statements[line];
                if (ts.isVariableStatement(state)) {
                    for (const declaration of state.declarationList.declarations) {
                        if (ts.isIdentifier(declaration.name) && declaration.initializer) {
                            const id = declaration.name.text;
                            if (id === identifier && ts.isNewExpression(declaration.initializer) && ts.isIdentifier(declaration.initializer.expression)) {
                                const typeName = declaration.initializer.expression.text;
                                if (['String', "Number", "Boolean", "Object", "Array", "Function", "Symbol"].indexOf(typeName) === -1) {
                                    type = typeName;
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    // 创建类型字符串字面量节点
    let argumentsArray = [];
    if (type || scopeArg) {
        const propType= type ? [ts.factory.createPropertyAssignment('value', ts.factory.createIdentifier(type))] : []
        const propScope =  scopeArg ? [ts.factory.createPropertyAssignment('scope', scopeArg)] : [];
        argumentsArray = [ts.factory.createObjectLiteralExpression([...propType, ...propScope])]
    }
    return argumentsArray;
}

export const config = [{ name: 'component', kind: SyntaxKind.MethodDeclaration, transformer }];

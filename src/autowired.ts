import ts from "typescript";

export function transformer(node: ts.PropertyDeclaration, sourceFile: ts.SourceFile): ts.Expression[] {
    let type;
    if (
      node.type &&
      ts.isTypeReferenceNode(node.type) &&
      (type = node.type.getText(sourceFile)) &&
      ['String', "Number", "Boolean", "Object", "Array", "Function", "Symbol"].indexOf(type) === -1
    ) {
      // 创建类型字符串字面量节点
      return [ts.factory.createIdentifier(type)];
    }
    return [];
}

export const decoratorNames = ['autowired', 'reactiveAutowired'];

import ts, {SyntaxKind} from "typescript";
import {config as c1} from "./autowired";
import {config as c2} from "./component";

const propertyTransformList: {decoratorName: string; transformer: Function}[] = [];
const methodTransformList: {decoratorName: string; transformer: Function}[] = [];
function register(kind: ts.SyntaxKind, decoratorName: string, transformer: Function) {
  let list;
  switch (kind) {
    case SyntaxKind.PropertyDeclaration:
      list = propertyTransformList;
      break;
    case SyntaxKind.MethodDeclaration:
      list = methodTransformList;
      break;
    default:
      return;
  }
  const find = list.find(i => i.decoratorName === decoratorName)
  if (!find) {
    list.push({ decoratorName, transformer })
  } else {
    // 目前一个装饰器对应一个transformer,且每个transformer也只处理对应的装饰器表达式
    throw new Error(`${decoratorName}存在多个transformer`);
  }
}

[...c1, ...c2].forEach(({ kind, name, transformer}) => {
  register(kind, name, transformer);
})

function transformer(program: ts.Program) {
  return function (context: ts.TransformationContext) {
    return function (sourceFile: ts.SourceFile) {
      function visit(node: ts.Node): ts.Node {
        if (ts.isPropertyDeclaration(node)) {
          const decorators = (node.modifiers || []).map((modifier: ts.Decorator) => {
            if (ts.isDecorator(modifier)) {
              const decoratorExpression = modifier.expression;
              // 检查是否是装饰器调用（如 @a()）
              let find;
              if (ts.isCallExpression(decoratorExpression) &&
                ts.isIdentifier(decoratorExpression.expression) &&
                (find = propertyTransformList.find(i => i.decoratorName === decoratorExpression.expression.getText(sourceFile)))
              ) {
                // 获取新入参
                const args = find.transformer(modifier, node, sourceFile);
                return ts.factory.updateDecorator(
                  modifier,
                  ts.factory.updateCallExpression(
                    decoratorExpression,
                    decoratorExpression.expression,
                    undefined,
                    args
                  )
                );
              }
            }
            return modifier;
          });
          return ts.factory.updatePropertyDeclaration(
            node,
            decorators,
            node.name,
            node.questionToken,
            node.type,
            node.initializer
          );
        } else if (ts.isMethodDeclaration(node)) {
          const decorators = (node.modifiers || []).map((modifier: ts.Decorator) => {
            if (ts.isDecorator(modifier)) {
              const decoratorExpression = modifier.expression;
              // 检查是否是装饰器调用（如 @a()）
              let find;
              if (ts.isCallExpression(decoratorExpression) &&
                ts.isIdentifier(decoratorExpression.expression) &&
                (find = methodTransformList.find(i => i.decoratorName === decoratorExpression.expression.getText(sourceFile)))
              ) {
                // 获取新入参
                const args = find.transformer(modifier, node, sourceFile);
                return ts.factory.updateDecorator(
                  modifier,
                  ts.factory.updateCallExpression(
                    decoratorExpression,
                    decoratorExpression.expression,
                    undefined,
                    args
                  )
                );
              }
            }
            return modifier;
          });
          return ts.factory.updateMethodDeclaration(
            node,
            decorators,
            node.asteriskToken,
            node.name,
            node.questionToken,
            node.typeParameters,
            node.parameters,
            node.type,
            node.body
          );
        } else {
          return ts.visitEachChild(node, visit, context);
        }
      }
      return ts.visitNode(sourceFile, visit);
    };
  };
}

export default transformer;

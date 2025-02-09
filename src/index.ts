import ts, {PropertyDeclaration} from "typescript";
import {decoratorNames, transformer as autowiredTransformer} from "./autowired";

const propertyTransformList: {decoratorName: string; transformer: Function}[] = [];
function register(decoratorName: string, transformer: Function) {
  const find = propertyTransformList.find(i => i.decoratorName === decoratorName)
  if (!find) {
    propertyTransformList.push({ decoratorName, transformer })
  } else {
    // 目前一个装饰器对应一个transformer,且每个transformer也只处理对应的装饰器表达式
    throw new Error(`${decoratorName}存在多个transformer`);
  }
}

decoratorNames.forEach(decoratorName => register(decoratorName, autowiredTransformer));

function transformer(program: ts.Program) {
  return function (context: ts.TransformationContext) {
    return function (sourceFile: ts.SourceFile) {
      function visit(node: ts.Node): ts.Node {
        if (ts.isPropertyDeclaration(node)) {
          const decorators = (node.modifiers || []).map((modifier: ts.Decorator) => {
          // 检查是否是装饰器
          if (ts.isDecorator(modifier)) {
            const decoratorExpression = modifier.expression;
            // 检查是否是装饰器调用（如 @a()）
            let find;
            if (ts.isCallExpression(decoratorExpression) &&
              ts.isIdentifier(decoratorExpression.expression) &&
              (find = propertyTransformList.find(i => i.decoratorName === decoratorExpression.expression.getText(sourceFile)))
            ) {
              const args = find.transformer(node, sourceFile);
              // 修改装饰器调用，将类型作为参数传递
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
        } else {
          return ts.visitEachChild(node, visit, context);
        }
      }
      return ts.visitNode(sourceFile, visit);
    };
  };
}

export default transformer;

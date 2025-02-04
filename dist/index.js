"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
function transformer(program) {
    return function (context) {
        return function (sourceFile) {
            function visit(node) {
                // 检查是否是属性声明节点
                if (ts.isPropertyDeclaration(node)) {
                    // 遍历修饰符（包括装饰器）
                    const decorators = (node.modifiers || []).map(modifier => {
                        // 检查是否是装饰器
                        if (ts.isDecorator(modifier)) {
                            const decoratorExpression = modifier.expression;
                            // 检查是否是装饰器调用（如 @a()）
                            if (ts.isCallExpression(decoratorExpression) &&
                              ts.isIdentifier(decoratorExpression.expression) &&
                              decoratorExpression.expression.text === 'autowired') {
                                // 获取属性的类型
                                const type = node.type ? node.type.getText(sourceFile) : 'unknown';
                                // 创建类型字符串字面量节点
                                const typeNode = ts.factory.createIdentifier(type);
                                // 修改装饰器调用，将类型作为参数传递
                                return ts.factory.updateDecorator(
                                  modifier,
                                  ts.factory.updateCallExpression(
                                    decoratorExpression,
                                    decoratorExpression.expression,
                                    undefined,
                                    [typeNode]
                                  )
                                );
                            }
                        }
                        return modifier;
                    });

                    // 更新属性声明节点
                    return ts.factory.updatePropertyDeclaration(
                      node,
                      decorators,
                      node.name,
                      node.questionToken,
                      node.type,
                      node.initializer
                    );
                }
                return ts.visitEachChild(node, visit, context);
            }
            return ts.visitNode(sourceFile, visit);
        };
    };
}
exports.default = transformer;

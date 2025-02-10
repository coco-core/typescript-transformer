import ts, {SyntaxKind} from "typescript";

function transformer(modifier: ts.Decorator, node: ts.ClassDeclaration, sourceFile: ts.SourceFile): ts.Expression[] {
  const constructorNode = node.members.find(
    (member) => ts.isConstructorDeclaration(member));
  const params = [];
  if (constructorNode) {
    constructorNode.parameters.forEach(param => {
      params.push(param.type.getText(sourceFile));
    })
    return params.map(p => {
      return ts.factory.createArrayLiteralExpression([ts.factory.createIdentifier(p)])
    })
  }
  return params;
}

export const config = [
  { kind: SyntaxKind.ClassDeclaration, name: 'constructorParam', transformer },
];

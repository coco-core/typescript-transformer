const ts = require('typescript');
const path = require('path');

exports.transpile = function (src) {
  const {outputText} = ts.transpileModule(src, {
    compilerOptions: {
      target: 'ESNext',
      module: 'ESNext',
      moduleResolution: 'node',
      allowSyntheticDefaultImports: true,
      verbatimModuleSyntax: true,
      jsx: 'preserve',
      resolveJsonModule: true,
      plugins: [
        {transform: path.join(__dirname, "../../dist/index.js")},
      ],
    },
    fileName: 'mock.ts',
  });

  return outputText;
}

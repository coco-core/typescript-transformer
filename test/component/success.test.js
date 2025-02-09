const { transpile } = require('../_helper/transpile');

describe('成功解析的情况', () => {
  test('return identifier', async () => {
    const source = `
class A {
  @component()
  hello() {
    const s = new Service();
    return s;
  }
}`;
    const decoratorExp = '@component({ value: Service })';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });


  test('return new 表达式', async () => {
    const source = `
    class A {
      @component()
      hello() {
        return new Service();
      }
    }`;
    const decoratorExp = '@component({ value: Service })';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('设置了Scope', async () => {
    const source = `
function autowired() {}
class A {
  @component(Component.Scope.Singleton)
  hello() {
    const s = new Service();
    return s;
  }
}
`;
    const decoratorExp = '@component({ value: Service, scope: Component.Scope.Singleton })';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

});

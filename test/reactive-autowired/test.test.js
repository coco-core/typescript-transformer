const { transpile } = require('../_helper/transpile');

describe('reactiveAutowired', () => {
  test('成功解析', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: User;
}`;
    const decoratorExp = '@reactiveAutowired(User)';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('没有提供类型', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('undefined', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: undefined;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('null', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: null;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('String', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: String;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Number', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: Number;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Boolean', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: Boolean;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Object', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: Object;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });
  test('Array', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: Array;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Function', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: Function;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Symbol', async () => {
    const source = `
class A {
  @reactiveAutowired()
  user: Symbol;
}`;
    const decoratorExp = '@reactiveAutowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

});

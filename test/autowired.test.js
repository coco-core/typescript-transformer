const { transpile } = require('./helper/transpile');

describe('autowired', () => {
  test('成功', async () => {
    const source = `
function autowired() {}
class A {
  @autowired()
  service: Service;
}`;
    const decoratorExp = '@autowired(Service)';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('没有提供类型', async () => {
    const source = `
class A {
  @autowired()
  user;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('undefined', async () => {
    const source = `
class A {
  @autowired()
  user: undefined;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('null', async () => {
    const source = `
class A {
  @autowired()
  user: null;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('String', async () => {
    const source = `
class A {
  @autowired()
  user: String;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Number', async () => {
    const source = `
class A {
  @autowired()
  user: Number;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Boolean', async () => {
    const source = `
class A {
  @autowired()
  user: Boolean;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Object', async () => {
    const source = `
class A {
  @autowired()
  user: Object;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });
  test('Array', async () => {
    const source = `
class A {
  @autowired()
  user: Array;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Function', async () => {
    const source = `
class A {
  @autowired()
  user: Function;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('Symbol', async () => {
    const source = `
class A {
  @autowired()
  user: Symbol;
}`;
    const decoratorExp = '@autowired()';

    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });
});

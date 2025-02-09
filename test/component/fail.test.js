const { transpile } = require('../_helper/transpile');

describe('没有获取到类型', () => {
  test('return undefined', async () => {
    const source = `
    class A {
      @component()
      hello() {
        return undefined;
      }
    }`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return null', async () => {
    const source = `
class A {
  @component()
  hello() {
    return null;
  }
}`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return new Number()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    return new Number();
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return new String()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    return new String();
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return new Boolean()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    return new Boolean();
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return new Object()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    return new Object();
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return new Object()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    return new Object();
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return new Array()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    return new Array();
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return new Function()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    return new Function();
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return new Symbol()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    return new Symbol();
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return identify created new Number()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    const v = new Number();
    return v;
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return identify created new String()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    const v = new String();
    return v;
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return identify created new Boolean()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    const v = new Boolean();
    return v;
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return identify created new Object()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    const v = new Object();
    return v;
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return identify created new Array()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    const v = new Array();
    return v;
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return identify created new Function()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    const v = new Function();
    return v;
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });

  test('return identify created new Symbol()', async () => {
    const source = `
function autowired() {}
class A {
  @component()
  hello() {
    const v = new Symbol();
    return v;
  }
}
`;
    const decoratorExp = '@component()';
    const output = transpile(source);
    expect(output).toContain(decoratorExp);
  });
});

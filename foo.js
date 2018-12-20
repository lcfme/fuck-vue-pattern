class Foo {
  constructor(opts = {}) {
    this.data = {};
    this.computed = {};
    Object.keys(opts).forEach(key => {
      if (this[key] && typeof this[key] === 'object') {
        Object.assign(this[key], opts[key]);
      }
    });
    new REH(this);
  }
  setData(opts = {}) {
    this.data = Object.assign({}, this.data, opts);
    console.log(this.data);
  }
}

var foo = new Foo({
  data: {
    a: 1,
    b: 2
  },
  computed: {
    bar() {
      return 'bar';
    },
    foobar() {
      return this.data.bar + this.data.a;
    },
    barfoo() {
      return this.data.foo + this.data.bar;
    },
    foo() {
      return this.data.a + this.data.b;
    }
  }
});

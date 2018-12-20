let $$wacher_count = 0;
class Watcher {
  constructor(self, getter, cb) {
    this.self = self;
    this.getter = getter;
    this.cb = cb;
    this.id = $$wacher_count++;
    this.deps = {};
    this.value = this.get();
  }
  get() {
    pushTarget(this);
    let val;
    try {
      val = this.getter.call(this.self);
    } catch (err) {
      throw err;
    } finally {
      popTarget();
      this.cleanupDeps();
    }
    return val;
  }
  cleanupDeps() {
    this.deps = {};
  }
  update(force = false) {
    const value = this.get();
    if (force || value !== this.value || isObject(value)) {
      let oldValue = this.value;
      this.value = value;
      try {
        this.cb.call(this.self, value, oldValue);
      } catch (err) {
        throw err;
      }
    }
  }
  addDep(dep) {
    const id = dep.id;
    if (!this.deps[id]) {
      this.deps[id] = dep;
      dep.addSub(this);
    }
  }
  depend() {
    for (const prop in this.deps) {
      this.deps[prop].depend();
    }
  }
}

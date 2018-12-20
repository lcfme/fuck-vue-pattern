function createComputedGetter(self, key) {
  return function computedGetter() {
    const watcher = self._computedWatchers && self._computedWatchers[key];
    if (!watcher) {
      return;
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.get();
  };
}

function defineComputed(self, t, key) {
  const getter = createComputedGetter(self, key);
  Object.defineProperty(t.data, key, {
    enumerable: true,
    configurable: true,
    set: noop,
    get: getter
  });
}

function initComputed(self, t) {
  if (!t.computed) {
    return;
  }
  if (!self._computedWatchers) {
    self._computedWatchers = {};
  }
  for (const props in t.computed) {
    self._computedWatchers[props] = new Watcher(
      t,
      t.computed[props],
      newVal => {
        console.log(`watcher:${props}:`, newVal);
        // t.setData({
        //   [props]: newVal
        // });
      }
    );
    defineComputed(self, t, props);
  }
}

function initData(self, t) {
  if (!t.data) {
    return;
  }
  self._dataWatchers = {};
  for (const props in t.data) {
    self._dataWatchers[props] = new Watcher(
      t,
      function() {
        return this.data[props];
      },
      newVal => {
        console.log(`watcher:${props}:`, newVal);
      }
    );
  }
}

class REH {
  constructor(t = {}) {
    this.t = t;
    observe(t.data);
    initData(this, t);
    initComputed(this, t);
  }
}

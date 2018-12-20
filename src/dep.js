let $$dep_count = 0;
class Dep {
  constructor() {
    this.id = $$dep_count++;
    this.subs = {};
  }
  addSub(watcher) {
    if (!this.subs[watcher.id]) {
      this.subs[watcher.id] = watcher;
    }
  }
  notify() {
    for (const id in this.subs) {
      this.subs[id].update(this.subs[id]);
    }
  }
  removeSub(watcher) {
    if (!this.subs[watcher.id]) {
      delete this.subs[watcher.id];
    }
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}
Dep.target = null;

const targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1] || null;
}

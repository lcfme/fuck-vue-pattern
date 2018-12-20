function observe(obj) {
  if (!isObject(obj)) {
    return;
  }
  let ob;
  if (hasOwn(obj, '__ob__') && obj.__ob__ instanceof Observer) {
    ob = obj.__ob__;
  } else {
    ob = new Observer(obj);
  }
  return ob;
}

class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, '__ob__', this);
    this.walk(value);
  }
  walk(obj) {
    for (const prop in obj) {
      defineReactive(obj, prop);
    }
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, key);
  if (propertyDescriptor && propertyDescriptor.configurable === false) {
    return;
  }
  const getter = propertyDescriptor && propertyDescriptor.get;
  const setter = propertyDescriptor && propertyDescriptor.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }

      return value;
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return;
      }
      if (getter && !setter) {
        return;
      } else if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = observe(newVal);
      dep.notify();
    }
  });
}

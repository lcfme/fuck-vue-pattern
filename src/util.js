function noop() {}

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

function isObject(obj) {
  return obj && typeof obj === 'object';
}

function hasOwn(obj, prop) {
  return Object.hasOwnProperty(obj, prop);
}

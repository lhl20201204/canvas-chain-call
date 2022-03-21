import Shape from "../Shape";

export function flattern(array) {
  return array.reduce((p, v) => {
    if (Array.isArray(v)) {
      p.push(...flattern(v))
    } else {
      p.push(v)
    }
    return p
  }, [])
}

export function throttle(fn, delay) {
  var timer;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay)
  }
}


const canSkip = (t) => (t instanceof Shape) || (t instanceof HTMLElement) || (typeof t === 'function')

export function copy(t) {

  if (Array.isArray(t)) {
    const ret = []
    for (const x of t) {
      if (canSkip(x)) {
        continue
      }
      ret.push(copy(x))
    }
    return ret
  }
  else if (t instanceof Object) {
    const ret = {}
    for (const attr in t) {
      if (canSkip(t[attr])) {
        continue
      }
      if (t[attr] instanceof Image) {
        ret[attr] = t[attr]
        continue
      }
      ret[attr] = copy(t[attr])
    }
    return ret
  }
  return t
}
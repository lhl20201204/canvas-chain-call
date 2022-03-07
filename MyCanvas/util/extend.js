
export function extendPrototype (newI, oldI) {
    Reflect.setPrototypeOf(newI, Reflect.getPrototypeOf(oldI))
}

export function extendOptions (newI, oldI) {
  for(const attr in oldI) {
    newI[attr] = oldI[attr]
  }
}
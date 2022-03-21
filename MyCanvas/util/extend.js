import { copy } from "."
export function extendPrototype(newI, oldI) {
  Reflect.setPrototypeOf(newI, Reflect.getPrototypeOf(oldI))
}

export function extendOptions(newI, oldI) {
  for (const attr in oldI) {
    newI[attr] = oldI[attr]
  }
}

export function merge(newI, oldI) {
  const ret = {}
  for (const attr in newI) {
    ret[attr] = copy(newI[attr])
  }
  for (const attr in oldI) {
    ret[attr] = copy(oldI[attr])
  }
  return ret
}
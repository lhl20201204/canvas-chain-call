import { extendPrototype } from "../util/extend"
export default class Options {
  constructor(options) {
    const ret = {
      ...this,
      ...options
    }
    extendPrototype(ret, this)
    return ret
  }
}
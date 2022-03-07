let index = 0
import transform from "../middleware/transform";
import useMiddleWare from "../middleware/useMiddleWare";
import { extendOptions } from '../util/extend'
const m = [transform]
export default class Shape {
  constructor(options) {
    this.scaleX = 1
    this.scaleY = 1
    this.fillStyle = '#000000'
    this.strokeStyle = '#000000'
    this.rotate = 0
    this.originX = 0
    this.originY = 0
    extendOptions(this, options)
    useMiddleWare(this, m)

    Object.defineProperty(this, "initStatus", {
      value: { ...this },
      enumerable: false
    })

    Object.defineProperty(this, "isDestroyed", {
      value: {
        value: false
      },
      enumerable: false
    })

    Object.defineProperty(this, "type", {
      value: options.type,
      enumerable: false
    })

    Object.defineProperty(this, "id", {
      value: index++,
      enumerable: false
    })

  }
  remove () {
    this.isDestroyed.value = true
  }

  reset (oldStaus) {
    for (const a in this) {
      if (!Reflect.has(oldStaus, a)) {
        Reflect.deleteProperty(this, a)
      } else {
        this[a] = oldStaus[a]
      }
    }
  }
}
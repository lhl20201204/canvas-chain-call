let index = 0
import transform from "../middleware/transform";
import useMiddleWare from "../middleware/useMiddleWare";
import { extendOptions } from '../util/extend'
import { flattern } from '../util'
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

    Object.defineProperty(this, "type", {
      value: options.type,
      enumerable: false
    })

    Object.defineProperty(this, "id", {
      value: index++,
      enumerable: false
    })

    Object.defineProperty(this, "parent", {
      value: {
        value: null
      },
      enumerable: false
    })

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

function remove (parent = this.parent.value.children) {
    const len = parent.length
    for(let i =0;i<len;i ++) {
      if(!parent[i]) {
        break;
      }
      if (Array.isArray(parent[i]) && remove.call(this, parent[i] )) {
        return true
      }
      if (parent[i].id === this.id) {
        parent.splice(i ,1)
        return true
      }
    }
    return false
}

Shape.prototype.remove = remove
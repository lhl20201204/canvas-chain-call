let index = 0
import transform from "../middleware/transform";
import useMiddleWare from "../middleware/useMiddleWare";
import { extendOptions } from '../util/extend'
import { copy } from '../util/index'
const m = [transform]

export default class Shape {
  constructor(options) {
    this.x = 0
    this.y = 0
    this.scaleX = 1
    this.scaleY = 1
    this.alpha = 1
    this.fillStyle = '#000000'
    this.strokeStyle = '#000000'
    this.rotate = 0
    this.originX = 0
    this.originY = 0
    extendOptions(this, options)
    useMiddleWare(this, m)

    Object.defineProperty(this, "firstStatus", {
      value: copy(this),
      enumerable: false
    })

    Object.defineProperty(this, "type", {
      value: options.type,
      enumerable: false
    })


    Object.defineProperty(this, "isInGroup", {
      value: {
        value: false
      },
      enumerable: false
    })

    Object.defineProperty(this, 'parent', {
      value: {
        value: null
      },
      enumerable: false
    })


    Object.defineProperty(this, "id", {
      value: index++,
      enumerable: false
    })


    Object.defineProperty(this, "container", {
      value: {
        value: null
      },
      enumerable: false
    })
    
  }
}

function _reset (oldStatus) {
  // console.log(this.type, this.id, '恢复初态',{...this}, oldStatus)
    for (const a in this) {
      if (!Reflect.has(oldStatus, a)) {
        Reflect.deleteProperty(this, a)
      } else {
        this[a] = copy(oldStatus[a])
      }
    }
  }

function remove (parent = this.container.value) {
    const len = parent.length
    for(let i =0;i<len;i ++) {
      if(!parent[i]) {
        break;
      }
      if (parent[i].id === this.id) {
        this._unMounted()
        parent.splice(i ,1)
        return true
      }
    }
    throw new Error('删除失败')
}

function _mountedInGroup(group) {
  this.isInGroup.value = true
  this.parent.value = group
  this.container.value = group.children
}

function _unMounted() {
  this.isInGroup.value = false
  this.parent.value = null
  this.container.value = null
}

Shape.prototype._reset = _reset
Shape.prototype._unMounted = _unMounted
Shape.prototype._mountedInGroup = _mountedInGroup
Shape.prototype.remove = remove
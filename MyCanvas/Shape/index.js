const { v4: uuidV4 } = require('uuid')
let index = 0
import transform from "../middleware/transform";
import useMiddleWare from "../middleware/useMiddleWare";
const m = [transform]
export default class Shape{
    constructor(options) {
       this.id = index ++
       this.defaultColor = '#000000'
       this.defaultOriginX = 0
       this.defaultOriginY = 0
       this.defaultScaleX = 1
       this.defaultScaleY = 1
       this.defaultRotate = 0
       this.scaleX =1
       this.scaleY =1
       this.isDestroyed= false
       for (const attr in options) {
          this[attr] = options[attr]
       }
       useMiddleWare.call(this, this, m)
    }
    remove () {
      this.isDestroyed = true
    }
 }
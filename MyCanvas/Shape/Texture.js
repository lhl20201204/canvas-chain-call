
import Shape from "./index";
import { getTotalXY } from "../util/math";
export default class Texture extends Shape {
  constructor(options = {}) {
    if (!options.src) {
      throw new Error('没有图片路径')
    }
    super({
      ...options,
      type: 'Texture',
    })

    const img = new Image();
    this.hadLoad = false
    this.load = new Promise((resolve) => {
      img.onload = () => {
      this.hadLoad = true
      this.sWidth = img.width
      this.sHeight = img.height
      resolve()
     }
    })
   
    img.src = options.src;
    Object.defineProperty(this, "image", {
      value: img,
      enumerable: false
    })
  }

  draw(ctx) {
    (async ()=>{
      await this.load
      const { hadLoad, image, width, height, sx = 0, sy = 0, sWidth, sHeight } = this
      const { x, y } = this.isInGroup.value ? getTotalXY(this) : this
      if (!width || !height) {
        ctx.drawImage(image, x, y)
      } else if (!sx || !sy) {
        ctx.drawImage(image, x, y, width, height)
      } else {
        ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
      }
    })()
   
  }

}
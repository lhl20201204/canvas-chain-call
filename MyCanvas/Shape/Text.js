
import Shape from "./index";
import { getTotalXY } from "../util/math";
export default class Text extends Shape {
  constructor(options = {}) {
    super({
      textBaseline: 'middle',
      fontType: 'serif',
      ...options,
      type: 'Text',
    })
  }

  draw(ctx) {
    const { content, fontSize, fontType, isStroke, textBaseline } = this
    const { x, y } = this.isInGroup.value ? getTotalXY(this) : this
    ctx.textBaseline = textBaseline
    ctx.font = `${fontSize}px ${fontType}`;
    ctx.beginPath()
    if (isStroke) {
      ctx.strokeText(content, x, y);
    } else {
      ctx.fillText(content, x, y);
    }
    ctx.closePath()
  }

  _caculate(ctx) {
    const text = ctx.measureText(this.content)
    this.width = text.width
    this.height = this.fontSize
  }

}
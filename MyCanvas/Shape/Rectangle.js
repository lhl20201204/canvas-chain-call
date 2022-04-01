
import { getTotalXY } from "../util/math";
import Shape from "./index";
export default class Rectangle extends Shape {
  constructor(options = {}) {
    super({
      ...options,
      type: 'Rectangle'
    })
  }

  draw(ctx) {
    const { width, height, isStroke } = this
    const { x, y } = this.isInGroup.value ? getTotalXY(this) : this
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    if (isStroke) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
    ctx.closePath();
  }

}
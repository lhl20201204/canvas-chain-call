
import Shape from "./index";

export default class Lines extends Shape {
  constructor(options = {}) {
    super({
      ...options,
      type: 'Lines',
    })
  }

  draw(ctx) {
    const { points, isStroke, noClosePath = false } = this
    const { sx, sy } = this
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    for (const p of points) {
      ctx[p.key || 'lineTo'](...(p.value || p));
    }

    if (isStroke) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
    !noClosePath && ctx.closePath();
  }

}
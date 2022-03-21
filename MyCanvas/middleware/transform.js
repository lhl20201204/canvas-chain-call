import { getTotalAttr, getTotalXY } from "../util/math"

export default function (_this) {
  return function (next) {
    return function f() {
      const args = [...arguments]

      if (_this.type !== 'Group' && ['draw'].includes(f.fnName)) {
        const ctx = args[0]
        const { isInGroup, width, height, radius, radiusX, radiusY, alpha, strokeStyle, fillStyle, originX, originY } = _this
        const total = isInGroup.value
        const { x, y } = total ? getTotalXY(_this) : _this
        const { rotate, scaleX, scaleY } = total ? getTotalAttr(_this) : _this
        const centerX = (x + (width || radius || radiusX || 0) * originX)
        const centerY = (y + (height || radius || radiusY || 0) * originY)
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotate);
        ctx.scale(scaleX, scaleY)
        ctx.translate(-centerX, -centerY);
        ctx.globalAlpha = alpha
        ctx.strokeStyle = strokeStyle
        ctx.fillStyle = fillStyle
        next(...args)
        ctx.restore()
      } else {
        next(...args)
      }
    }
  }
}
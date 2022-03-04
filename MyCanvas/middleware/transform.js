// import Options from "../Options"
export default function(_this) {
  return function (next) {
      return async function f(){
          const args = [...arguments]
          if (['draw'].includes(f.fnName) && (args[0] instanceof CanvasRenderingContext2D) ) {
             const ctx = args[0]
             const { width, height, x,strokeStyle, fillStyle, y, originX, originY, rotate, scaleX, scaleY} = _this
             const centerX =(x + (width || 0) * originX)
             const centerY =(y + (height || 0) * originY)
             ctx.save();
             ctx.translate(centerX, centerY);
             ctx.rotate( rotate);
             ctx.scale( scaleX, scaleY)
             ctx.translate(-centerX, -centerY);
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
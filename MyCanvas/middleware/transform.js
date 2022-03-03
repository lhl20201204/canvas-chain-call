// import Options from "../Options"
export default function(_this) {
  function get (a,b) {
    return Reflect.has(_this, a) ? Reflect.get(_this, a): Reflect.get(_this, b)
  }
  return function (next) {
      return async function f(){
          const args = [...arguments]
          if (['draw'].includes(f.fnName) && (args[0] instanceof CanvasRenderingContext2D) ) {
             const ctx = args[0]
             const { width, height, x,  y} = _this
             const centerX =(x + (width || 0) * get('originX' , 'defaultOriginX' ))
             const centerY =(y + (height || 0) * get('originY' , 'defaultOriginY'))
             ctx.save();
             ctx.translate(centerX, centerY);
             ctx.rotate( get('rotate', 'defaultRotate'));
             ctx.scale( get('scaleX', 'defaultScaleX'), get('scaleY', 'defaultScaleY'))
             ctx.translate(-centerX, -centerY);
             ctx.strokeStyle = get('strokeStyle', 'defaultColor')
             ctx.fillStyle = get('fillStyle', 'defaultColor')
             next(...args)
             ctx.restore()
          } else {
             next(...args) 
          }
      }  
  }
}
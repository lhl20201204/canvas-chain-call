
import Shape from "./index";

export default class Lines extends Shape {
    constructor(options ={}) {
        super({
          ...options,
           type:'Lines',
        })
      }

   draw(ctx) {
       const { points, isStorke, noClosePath} = this
       const { sx, sy } = this
       ctx.beginPath();
       ctx.moveTo(sx, sy);
       for(const p of points) {
        ctx[p.key || 'lineTo'](...(p.value|| p));
       }
      !noClosePath && ctx.closePath();
      if (isStorke) {
         ctx.stroke();
       }else {
        ctx.fill();
       }
    
   }

}
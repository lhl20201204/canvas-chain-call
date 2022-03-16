
import Shape from "./index";
import { getTotalXY } from "../util/math";
export default class Ellipse extends Shape {
    constructor(options ={}) {
        super({
          ...options,
          type:'Ellipse'
        })
      }

   draw(ctx) {
       const { radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise = false, isStorke} = this
       const { x, y } = this.isInGroup.value ? getTotalXY(this) : this
       ctx.beginPath();
       ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise); //倾斜45°角
       if (isStorke) {
         ctx.stroke();
       }else {
        ctx.fill();
       }
       ctx.closePath();
   }

}
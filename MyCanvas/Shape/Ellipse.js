
import Shape from "./index";
export default class Ellipse extends Shape {
    constructor(options ={}) {
        super({
          type:'Ellipse',
          ...options
        })
      }

   draw(ctx) {
       const {x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise = false, isStorke} = this
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

import Shape from "./index";
export default class Ellipse extends Shape {
   draw(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise = false, options ={}) {
       const { ctx } = this
       ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise); //倾斜45°角
       ctx.stroke();
   }

}
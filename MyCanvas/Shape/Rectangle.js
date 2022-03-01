
import Shape from "./index";
export default class Rectangle extends Shape {
   draw(x, y, width, height, options ={}) {
       const { ctx } = this
       const { isStorke } = options 
       if (isStorke) {
            ctx.strokeRect(x, y, width, height);
       }else {
           ctx.fillRect(x, y, width, height);
       }

   }

   clear(x, y, width, height, options={}) {
    const { ctx } = this
    ctx.clearRect(x, y, width, height);
   }

}
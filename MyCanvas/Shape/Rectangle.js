
import Shape from "./index";
export default class Rectangle extends Shape {
  constructor(options ={}) {
    super({
      type:'Rectangle',
      ...options
    })
  }

   draw (ctx) {
       const { width, height, x,  y, isStorke } = this
       if (isStorke) {
            ctx.strokeRect(x, y, width, height);
       }else { 
           ctx.fillRect(x, y, width, height);
       }
   }

}
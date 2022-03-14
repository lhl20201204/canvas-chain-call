
import Shape from "./index";
import { getTotalXY } from "../util/math";
export default class Text extends Shape {
    constructor(options ={}) {
        super({
          textBaseline: 'middle',
          fontType: 'serif',
          type:'Text',
          ...options
        })
      }

   draw(ctx) {
      const {  content, fontSize, fontType, isStorke, textBaseline } = this
      const { x, y } = this.isInGroup.value ? getTotalXY(this) : this
      ctx.textBaseline = textBaseline
      ctx.font = `${fontSize}px ${fontType}`;
      if (isStorke) {
        ctx.strokeText(content, x, y);
      } else {
        ctx.fillText(content, x, y);
      }
   }
   
   _caculate(ctx) {
     const text = ctx.measureText(this.content)
     this.width = text.width 
     this.height = this.fontSize
   }

}

import Shape from "./index";
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
      const { x, y, content, fontSize, fontType, isStorke, textBaseline } = this
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
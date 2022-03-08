import { extendOptions } from '../util/extend'
import { throttle } from '../util'
export default class Controller  {
  constructor (options = {}) {
    if (!options.el) {
      throw new Error('没有实例对象')
    }
  const canvas = options.el
    //解决锯齿
	
    options = {
      ctx: options.el.getContext('2d'),
      animations: [],
      ...options
    }
  const ratio = 2 * (window.devicePixelRatio || 1)
  const width = canvas.width * ratio,height= canvas.height*ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.height = height  ;
  canvas.width = width ;	  
  options.ctx.scale(ratio, ratio);  
  extendOptions(this, options)
  }


}

function render () {
  const { animations, width, height, ctx } = this
  ctx.clearRect(0, 0, width, height);
   for(const a of animations) {
    const { children } = a
    a._draw(children, ctx)
   }
 }

 
 
 Controller.prototype.render =  throttle(render, 50/ 3)
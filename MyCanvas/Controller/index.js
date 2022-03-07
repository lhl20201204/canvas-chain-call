import { extendOptions } from '../util/extend'
export default class Controller  {
  constructor (options = {}) {
    if (!options.el) {
      throw new Error('没有实例对象')
    }
    options = {
      ctx: options.el.getContext('2d'),
      animations: [],
      isRefreshing: false,
      duty: [],
      ...options
    }
    extendOptions(this, options)
  }

  render () {
   const { animations, el, ctx } = this
   ctx.clearRect(0, 0, el.width, el.height);
    for(const a of animations) {
     const { children } = a
     a._draw(children, ctx)
    }
  }

  refresh() {
    if (this.isRefreshing) {
      return
    }
    const { duty } = this
   
    this.isRefreshing = true
    Promise.all(duty).then( () => {
        this.isRefreshing = false
    })
    const step  = () => {
        this.render()
        if (this.isRefreshing) { // 在time后停止动画
          window.requestAnimationFrame(step);
        } 
      }
    window.requestAnimationFrame(step); 
  }

}
import Rectangle from "./Shape/Rectangle"
import Ellipse from "./Shape/Ellipse"
import useMiddleWare from "./middleware/useMiddleWare"
import genInstance from './util'
const proxyClass = [{
    key: 'Rectangle',
    Ctor: Rectangle
},{
    key: 'Ellipse',
    Ctor: Ellipse
}]


export default class MyCanvas {
  constructor (options = {}) {
    const { el, ctx, width, height, isMounted, promise } = options 
    const els =  el || document.createElement('canvas')
    const ctxs = ctx || els.getContext('2d')
    const promises = promise || new Promise((resolve, reject) => {
        resolve('init')
    })
    if (!el) {
     els.style.width = width || '100vw'
     els.style.height = height || '100vh'
    }
   
    const ret = useMiddleWare.call(this, proxyClass, {
        el: els,
        ctx: ctxs,
        isMounted,
        promise: promises
    })
    return ret
  }
  
  mount(parent) {
    if (!this.el) {
       throw new Error('没有实例对象') 
    }
    this.isMounted = true
    parent.appendChild(this.el)
    return genInstance(this)()
  }

  async wait(delay) {
   await new Promise(resolve => {
       setTimeout(() => {
           resolve()
       },delay)
   })
  }
  
}
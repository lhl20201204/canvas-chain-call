import useMiddleWare from "./middleware/useMiddleWare"
import addHooks from "./middleware/addHooks"
import log from "./middleware/log"
import { colorHex } from "./util/color"
const m = [addHooks, log]
export default class MyCanvas {
  constructor (options = {}) {
    options = {
      promise : Promise.resolve('init instance'),
      children : [],
      ...options
    }
    const { 
       el,
       ctx
      } = options 

    options.ctx = ctx || el.getContext('2d')
    return useMiddleWare.call(this, options, m)
  }
  
  async wait(delay) {
   await new Promise(resolve => {
       setTimeout(() => {
           resolve()
       },delay)
   })
  }

  async call(fn) {
    if ( typeof fn === 'function') {
      await fn(this)
    }
  }
 
}



function diff(target, newAttrs) {
   const diffs = {
     keys: [],
     values: {}
   }
   for(const attr in newAttrs) {
      if(!Reflect.has(target,attr)) {
        target[attr] = 0 
        if (['fillStyle', 'strokeStyle'].includes(attr)) {
          target[attr] =  '#000000'
       }
      }
      let diff
      if (['fillStyle', 'strokeStyle'].includes(attr)) {
         diff = toInt(newAttrs[attr]) - toInt(target[attr])
         target[attr] = colorHex(target[attr])
      } else {
         diff = newAttrs[attr] - target[attr]
      }
      if(diff) {
        diffs.keys.push(attr)
        if (['fillStyle', 'strokeStyle'].includes(attr)) {
          diffs.values[attr] = colorHex(newAttrs[attr])
        }else {
          diffs.values[attr] = diff
        }
      }
   }
   diffs.init = {
     ...target
   }
   return diffs
}


function render() {
   const { children, ctx, el } = this
   ctx.clearRect(0, 0, el.width, el.height);
   this._draw(children, ctx)
}


function toInt(x) {
  return parseInt(colorHex(x).slice(1), 16)
}

function colourBlend (c1, c2, ratio) {
  ratio = Math.max(Math.min(Number(ratio), 1), 0)
  let r1 = parseInt(c1.substring(1, 3), 16)
  let g1 = parseInt(c1.substring(3, 5), 16)
  let b1 = parseInt(c1.substring(5, 7), 16)
  let r2 = parseInt(c2.substring(1, 3), 16)
  let g2 = parseInt(c2.substring(3, 5), 16)
  let b2 = parseInt(c2.substring(5, 7), 16)
  let r = Math.round(r1 * (1 - ratio) + r2 * ratio)
  let g = Math.round(g1 * (1 - ratio) + g2 * ratio)
  let b = Math.round(b1 * (1 - ratio) + b2 * ratio)
  r = ('0' + (r || 0).toString(16)).slice(-2)
  g = ('0' + (g || 0).toString(16)).slice(-2)
  b = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + r + g + b
}

function run(target, diffs , time, concurrent = false) {
  const _this = this
  let start = null
  const { init, values, keys} = diffs
  return new Promise((resolve,reject)=> {
    try {
     function step(timestamp) {
      if (!start) {
        start = timestamp
      }
      const elapsed = timestamp - start;
      const ratio = Math.min(elapsed/time , 1)
      for (const key of keys) {
        if (['fillStyle', 'strokeStyle'].includes(key)) {
          target[key] = colourBlend(init[key], values[key], ratio  )
         } else {
         target[key] = init[key] +  ratio* values[key] // 这样写不用考虑正负值
       }
      }  
      !concurrent && _this._render()
      if (elapsed < time) { // 在两秒后停止动画
        window.requestAnimationFrame(step);
      }else {
        for (const key of keys) {
          if (['fillStyle', 'strokeStyle'].includes(key)) {
            target[key] = values[key]
          } else {
            target[key] = init[key] + values[key]
         }
        }  
        !concurrent && _this._render()
        resolve()
      }
     }
     window.requestAnimationFrame(step); 
    }catch(e) {
      reject(e)
    } 
  })
}


async function MySetInterval(fn, p) {
  return  new Promise ((resolve) => { 
    let over = false
     function step() {
        fn()
        if (!over){
          window.requestAnimationFrame(step);
        }
      }
    window.requestAnimationFrame(step);
     p.then(() => {
      over = true
      resolve()
    })
   }) 

}


async function move(options, concurrent) {
   if (!options) {
     throw new Error('没有参数')
   }
   if (Array.isArray(options)) {
     return MySetInterval(render.bind(this) ,Promise.all(options.map(v => move.call(this, v ,true))))
   }
   const { target, time = 1000, ...rest } = options
   if (!target) {
     throw new Error('没有操作对象')
   }
   const diffs = diff(target, rest)
   return this._run( target, diffs, time, concurrent) 
}

async function draw(parent, ctx) { 
   let index = 0 
   while (index < parent.length) {
     const instance = parent[index]
     if (instance.isDestroyed) {
       parent.splice(index, 1)
     } else {
       instance.draw(ctx)
       index++
     }
   }
}

async function remove(child) {
  if (Array.isArray(child)) {
    return await Promise.all(child.map(v => remove.call(this, v)))
  }
  child.remove()
  this._render()
}

async function add(child) {
  if (Array.isArray(child)) {
    return await Promise.all(child.map(v => add.call(this, v)))
  } 
  const { children, ctx } = this
  child.isDestroyed = false
  children.push(child)
  child.draw(ctx)
}

MyCanvas.prototype._run = run
MyCanvas.prototype._draw = draw
MyCanvas.prototype._render = render
MyCanvas.prototype.draw = draw
MyCanvas.prototype.move = move
MyCanvas.prototype.remove = remove
MyCanvas.prototype.add = add

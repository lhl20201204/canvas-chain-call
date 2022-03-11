import useMiddleWare from "./middleware/useMiddleWare"
import addHooks from "./middleware/addHooks"

import log from "./middleware/log"
import { colorHex, colourBlend, toInt } from "./util/color"
import { extendOptions } from './util/extend'
import { flattern } from './util'
import Dynamic from "./Dynamic"
import bezierCurve from "./util/math"
const defaultTime = 1000
const style = ['fillStyle', 'strokeStyle']
const maxSize = 100 // 一组为多少个刷新，可以设置 Number.MAX_VALUE ,运动的时候不分批刷新
const needReverseFn = ['add', 'remove']
const reverseFnStore = {
  'add': 'remove',
  'remove': 'add'
}
const m = [addHooks, log]
export default class MyCanvas {
  constructor(options = {}) {
    options = {
      usedElements: [],
      isReversing: false,
      history: [],
      promise: new Promise((resolve) => {
        this._start = resolve
        options.auto && resolve()
      }),
      children: [],
      ...options
    }
    const {
      controller
    } = options
    if (!controller) {
      throw new Error('没有管理器实例')
    }
    options.el = controller.el
    options.ctx = controller.ctx
    options.width = options.el.width
    options.height = options.el.height
    options.animations = controller.animations
    options._render = controller.render
    options.longFail = controller.longFail
    extendOptions(this, options)
    useMiddleWare(this, m)
    controller.animations.push(this)
  }
}

async function wait (delay) {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

async function call (fn) {
  if (typeof fn === 'function') {
    await fn(this)
  }
}

function diff (options) {
  if (Array.isArray(options)) {
    options.time = 0
    options.forEach(e => {
      diff.call(this, e) 
      options.time = Math.max(options.time, e.time)
    })
    return 
  }

  options.time = options.time || defaultTime
  const { target, time, initStatus, endStatus, ...rest } = options
  if (!target) {
    throw new Error('没有操作对象')
  }
  if (!this._hadExisted(target)) {
    this._add(target)
  }
  // 如果逻辑相反
  let start = target
  let end = rest
  if (this.isReversing) {
    start = endStatus
    target.reset(endStatus)
    end = initStatus
  }

  const diffs = {
    keys: [],
    values: {}
  }
  for (const attr in end) {
    if (!Reflect.has(start, attr)) {
      start[attr] = 0
    }
    let diff
    if (style.includes(attr)) {
      diff = toInt(end[attr]) - toInt(start[attr])
      start[attr] = colorHex(start[attr])
    } else {
      diff = end[attr] - start[attr]
    }
    if (diff) {
      diffs.keys.push(attr)
      if (style.includes(attr)) {
        diffs.values[attr] = colorHex(end[attr])
      } else {
        diffs.values[attr] = diff
      }
    }
  }
  diffs.init = {
    ...start
  }
  options.diffs = diffs
}


function run (options ) {
  let start = null
  const caches = flattern([options])
  caches.forEach(c => c.endRender = false)
  const chunk = [] // 分批
  while(caches.length > 0) {
    chunk.push(caches.splice(0,maxSize))
  }
  const _this = this
  return Promise.all(chunk.map(cache =>  new Promise((resolve, reject) => {
    try {
      const time = Math.max(...cache.map(v => v.time ))
      function step (timestamp) {
        if (!start) {
          start = timestamp
        }
        // flag && console.log('刷新')
        const elapsed = timestamp - start;
        for (const currentOptions of cache) {
          if (currentOptions.endRender) {
            continue
          }
        const { diffs, target , time, curse } = currentOptions
        const { init, values, keys  } = diffs
        const ratio = Math.min(elapsed / time, 1)
        if (ratio === 1) {
          currentOptions.endRender = true
        }
        for (const key of keys) {
          if (style.includes(key)) {
            target[key] = colourBlend(init[key], values[key], ratio)
          } else {
            if (curse && curse[key]) {
              target[key] = bezierCurve(init[key], curse[key], init[key] + values[key], ratio)
            }else {
               target[key] = init[key] + ratio * values[key] // 这样写不用考虑正负值
            }
          }
        } 
        }
       
       _this._render()
        if (elapsed < time) { // 在time后停止动画
          window.requestAnimationFrame(step);
        } else {
          resolve()
        }
      }
      window.requestAnimationFrame(step);
    } catch (e) {
      reject(e)
    }
  })))
  
}


function _hadExisted (child, children) {
  if (!children) {
    children = this.children
  }
  return children.some(v => Array.isArray(v) ? _hadExisted(child, v) : v.id === child.id)
}


async function move (options) {
  if (!options) {
    throw new Error('没有参数')
  }
  if ( options instanceof Dynamic) {
    options = options.cache
  }
  diff.call(this, options)
  return this._run(options)
}

async function draw (parent, ctx) {
  let index = 0
  const len = parent.length
  while (index <len) {
    parent[index++].draw(ctx)
  }
}

async function removeDynamic(x) {
   if (Array.isArray(x)) {
     return Promise.all(x.map(v => removeDynamic.call(this, v)))
   }
   if (!(x instanceof Dynamic)) {
     throw new Error('不是dynamic实例')
   }
   return remove.call(this,  x.cache )
}

async function remove (child) {
  if ( child instanceof Dynamic) {
    child = child.cache
    // console.log('移除', child.id, Reflect.ownKeys(child), [...this.children])
  }
  if (Array.isArray(child)) {
    return await Promise.all(child.map(v => remove.call(this, v)))
  }

  if (this._hadExisted(child)) {
    child.remove()
  }
  this._render()
}

async function add (child) {
  if ( child instanceof Dynamic) {
    child = child.cache
  }
  if (Array.isArray(child)) {
    return await Promise.all(child.map(v => this._add(v)))
  }
  const { children, ctx, usedElements } = this
  if (!this._hadExisted(child)) {
    usedElements.push(child)
    children.push(child)
    child.animations.value = this
    child.draw(ctx)
  }
}


function getReverseFn (flag, fnName) {
  return flag ? needReverseFn.includes(fnName) ? reverseFnStore[fnName] : fnName : fnName
}

async function _reStart () {
  this.children.splice(0, this.children.length)

  let FNchain = await Promise.all(this.history)
  this.promise = Promise.resolve('init instance')
  this.history.splice(0, this.history.length)
  if (this.reverse) {
    this.isReversing = !this.isReversing
    FNchain = FNchain.reverse()
  }
  this.usedElements.forEach(e => {
    if (!this.isReversing) {
      e.reset(e.initStatus)
    }
  })


  this.usedElements.splice(0, this.usedElements.length)
  FNchain.reduce((p, { fnName, arguments: args }) => {
    return p[getReverseFn(this.reverse, fnName)](...args)
  }, this)

  this.controller.render()
}

async function _end () {
  if (this.infinity) {
    this._reStart()
  } else if (this.loop > 1) {
    this.loop--
    this._reStart()
  }
}

MyCanvas.prototype._end = _end
MyCanvas.prototype._reStart = _reStart
MyCanvas.prototype._hadExisted = _hadExisted
MyCanvas.prototype._run = run
MyCanvas.prototype._draw = draw
MyCanvas.prototype.draw = draw
MyCanvas.prototype.move = move
MyCanvas.prototype.remove = remove
MyCanvas.prototype._remove = remove
MyCanvas.prototype.add = add
MyCanvas.prototype._add = add
MyCanvas.prototype.wait = wait
MyCanvas.prototype.call = call
MyCanvas.prototype.removeDynamic = removeDynamic

import { extendOptions } from '../util/extend'
import { flattern, throttle } from '../util'
import Dynamic from '../Dynamic'
import Watch from '../watch'
import Group from '../Shape/Group'

function setWH(canvas, width, height) {
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.height = height;
  canvas.width = width;
}

function putCopyEle(canvas, newCanvas) {
  const parent = canvas.parentNode
  parent.style.position = 'relative'
  newCanvas.style.position = 'absolute'
  newCanvas.style.left = `${canvas.offsetLeft}px`
  newCanvas.style.top = `${canvas.offsetTop}px`
  const ratio = 2 * (window.devicePixelRatio || 1)
  const width = canvas.width * ratio, height = canvas.height * ratio;
  setWH(canvas, width, height)
  setWH(newCanvas, width, height)
  parent.appendChild(newCanvas)
  return ratio
}


function isInAnimations(target, parent = flattern(this.animations.map(v => v.children))) {
  for (const t of parent) {
    if (t.id === target.id) {
      return true
    }
    if (t instanceof Group && isInAnimations(target, t.children)) {
      return true
    }
  }
  return false
}


function addEventListener(newCanvas, ratio) {
  const { addEventListenerTargets, watch } = this
  const ctx = newCanvas.getContext('2d')
  newCanvas.addEventListener('click', (e) => {
    const x = Math.floor(e.offsetX) / ratio
    const y = Math.floor(e.offsetY) / ratio
    for (const target of addEventListenerTargets) {
      if (!isInAnimations.call(this, target)) {
        continue
      }
      target.draw(ctx)
      if (['Text', 'Group'].includes(target.type)) {
        const data = ctx.getImageData(x, y, 1, 1).data
        if (data[3] !== 0) {
          watch.trigger(target)
        }
      } else {
        if (target.isStroke) {
          if (ctx.isPointInStroke(x, y)) {
            watch.trigger(target)
          }
        } else {
          if (ctx.isPointInPath(x, y)) {
            watch.trigger(target)
          }
        }
      }

      ctx.clearRect(0, 0, newCanvas.width, newCanvas.height)
    }
  }, false)
}

export default class Controller {
  constructor(options = {}) {
    if (!options.el) {
      throw new Error('没有实例对象')
    }
    const canvas = options.el
    const newCanvas = document.createElement('canvas')
    //解决锯齿
    options = {
      animations: [],
      ...options,
      ctx: options.el.getContext('2d'),
      addEventListenerTargets: []
    }

    const ratio = putCopyEle(canvas, newCanvas)
    this.ratio = ratio;
    this.watch = new Watch({
      controller: this
    })

    options.ctx.scale(ratio, ratio);
    extendOptions(this, options)
    addEventListener.call(this, newCanvas, ratio)
  }


}

function render() {
  const { longFail, animations, width, height, ctx, track = 1 } = this
  if (longFail) {
    ctx.fillStyle = 'rgba(255,255,255,' + track + ')';
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.clearRect(0, 0, width, height);
  }

  for (const a of animations) {
    const { children } = a
    a._draw(children, ctx)
  }
}


function copyDynamic(target, fn = t => t) {
  function copyAll(t) {
    return Array.isArray(t) ? t.map(v => copyAll(v)) : new (Reflect.getPrototypeOf(t).constructor)({
      ...fn(t)
    })
  }
  return new Dynamic(() => {
    return copyAll(target.cache)
  })

}



Controller.prototype.copyDynamic = copyDynamic
Controller.prototype.render = throttle(render, 50 / 3)
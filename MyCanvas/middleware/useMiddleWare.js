const exclude = ['constructor', 'mount']
import addHooks from "./addHooks"
import log from "./log"
const m = [addHooks, log]


export default function useMiddleWare (proxyClass, { el, ctx, isMounted,promise}) {
  const ret = {
      el,
      ctx,
      isMounted,
      promise
  }

  ret.__proto__  = Reflect.getPrototypeOf(this)

  function proxy( obj, fn = (x=>x)) {
    const prototype = Reflect.getPrototypeOf(obj)
    const attrs = Reflect.ownKeys(prototype)
    const middlewares = m.map(v=> v(ret))
    attrs.forEach(attr => {
        if (exclude.includes(attr) || (typeof Reflect.get(obj, attr) !== 'function')) {
           return
        }
        const originvalue = Reflect.get(obj, attr).bind(ret)
        const newvalue = middlewares.reduce( (p,v) => v(p) , originvalue)
        const name = fn(attr)
        newvalue.fnName = name
        Object.defineProperty(ret, name, {
            get() {
              return newvalue
            }
        })
    })
  }

  for(const c of proxyClass) {
    proxy( new c.Ctor(ctx, ret), (attr)=> attr + c.key)
  }
  proxy(ret)
  
  return ret
 }
 
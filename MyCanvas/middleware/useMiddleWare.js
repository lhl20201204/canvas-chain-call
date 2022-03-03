import { extendPrototype } from "../util/extend"

const exclude = ['constructor']

export default function useMiddleWare (options, m) {
  const ret = options
  extendPrototype(ret, this)
  function proxy( obj, fn = (x=>x)) {
    const prototype = Reflect.getPrototypeOf(obj)
    const attrs = Reflect.ownKeys(prototype)
    const middlewares = m.map(v=> v(ret))
    attrs.forEach(attr => {
        if (exclude.includes(attr) || (typeof Reflect.get(obj, attr) !== 'function') || attr.startsWith('_')) {
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

  proxy(ret)
  
  return ret
 }
 
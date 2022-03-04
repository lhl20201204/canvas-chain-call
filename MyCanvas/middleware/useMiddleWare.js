import { extendPrototype } from "../util/extend"

const excludeAttr = ['constructor']

export default function useMiddleWare (options, m) {
  const ret = options
  extendPrototype(ret, this)
  function proxy( obj, fn = (x=>x)) {
    const prototype = Reflect.getPrototypeOf(obj)
    const attrs = Reflect.ownKeys(prototype)
    const middlewares = m.map(v=> v(ret))
    attrs.forEach(attr => {
        if (excludeAttr.includes(attr) || (typeof Reflect.get(obj, attr) !== 'function') || attr.startsWith('_')) {
           return
        } 
        const name = fn(attr)
        const originvalue = Reflect.get(obj, attr).bind(ret)
        const newvalue = middlewares.reduce( (p,v) =>{
          const f = v(p)
          f.fnName = name
          return f
        }
        , originvalue)

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
 
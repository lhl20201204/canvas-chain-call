const excludeAttr = ['constructor']
import Shape from "../Shape"
import MyCanvas from "../index"

export default function useMiddleWare (ret, m) {
  function proxy (obj, fn = (x => x)) {
    const prototype = Reflect.getPrototypeOf(obj)
    const attrs = Reflect.ownKeys(prototype)
    const middlewares = m.map(v => v(ret))
    attrs.forEach(attr => {
      if (excludeAttr.includes(attr) || (typeof Reflect.get(obj, attr) !== 'function') || attr.startsWith('_')) {
        return
      }
      const name = fn(attr)
      const originvalue = Reflect.get(obj, attr).bind(ret)
      const newvalue = middlewares.reduce((p, v) => {
        const f = v(p)
        f.fnName = name
        return f
      }
        , originvalue)

      Object.defineProperty(ret, name, {
        get () {
          return newvalue
        }
      })
    })
    if (![Shape, MyCanvas].includes(prototype.constructor)) {
      proxy(prototype) // 处理子类继承时候的代理
    }
  }

  proxy(ret)
}

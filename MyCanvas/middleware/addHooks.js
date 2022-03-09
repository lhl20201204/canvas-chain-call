import Options from "../Options"
import Dynamic from "../Dynamic"

const needHandles = ['move']
const unNeedGetresult = ['removeDynamic']
function addInitStatus (children) {
  if (Array.isArray(children)) {
    return children.forEach(e => {
      addInitStatus(e)
    })
  }
  if (children instanceof Object && !Reflect.has(children, 'initStatus') && Reflect.has(children, 'target')) {
    const { target, time = 1000, initStatus, endStatus, concurrent = false, ...rest } = children
    children.initStatus = { ...children.target }
    children.endStatus = { ...children.target, ...rest }
  }
}
export default function(ret) {
  return function (next) {
      return async function f(){
         const args = [].slice.call(arguments)
         let instance = args[0]
            let t2 = args[0]
            if ( instance instanceof Dynamic && !unNeedGetresult.includes(f.fnName)) {
              if (!ret.isReversing) {
                instance.getResult(ret)
              }
              t2 = instance.cache
            }
            if (needHandles.includes(f.fnName) && !t2.hasAddInitSatus) {
              addInitStatus(t2)
              Object.defineProperty(t2, "hasAddInitSatus", {
                value: true,
                enumerable: false
              })
            }

         const t =  args[args.length-1] 
         if (t && t instanceof Options) {
             if (typeof t.before === 'function') {
                 t.before = [t.before]
                
             } 
            Array.isArray(t.before)&&t.before.forEach(fn => {
              fn(ret, f.fnName)
             });

            await next(...args)
             if (typeof t.after === 'function') {
                t.after = [t.after]
             }
             Array.isArray(t.after)&&t.after.forEach(fn => {
              fn(ret, f.fnName)
             });
         } else {   
            await next(...args)
         }
      }  
  }
}
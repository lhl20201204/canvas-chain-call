import Options from "../Options"
import Dynamic from "../Dynamic"
import { copy } from "../util/index"
import { merge} from "../util/extend"

const needHandles = ['move']
const unNeedGetresult = ['removeDynamic']
function addInitStatus (children) {
  if (Array.isArray(children)) {
    return children.forEach(e => {
      addInitStatus(e)
    })
  }
  
  if (children instanceof Object && !Reflect.has(children, 'initStatus') && Reflect.has(children, 'target')) {
    const { target, time = 1000, selfChange, children:c , ...rest } = children
    Object.defineProperty(children, "initStatus", {
      value: {...copy(target)},
      enumerable: false
    })
     
    Object.defineProperty(children, "endStatus", {
      value:  merge(copy(target), copy(rest)),
      enumerable: false
    })
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
                instance.pushResult(ret)
                // console.log([...instance.resultStack])
              }  
              t2 = instance.cache
              // if (f.fnName === 'move') {
              //     console.log(ret.isReversing,t2)
              // }
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
import Options from "../Options"
export default function(ret) {
  return function (next) {
      return async function f(){
         const args = [].slice.call(arguments)
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

        return ret
      }  
  }
}
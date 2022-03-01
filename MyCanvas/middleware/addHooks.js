
export default function(ret) {
  return function (next) {
      return async function(){
         if (!ret.isMounted) {
           throw new Error('未挂载')
         }
         const args = [].slice.call(arguments)
         const t = args[args.length-1]
         if (t && t instanceof Object) {
             const {before, after} = t 
             if (typeof before === 'function') {
                 before(obj)
             }
            await next(...args)
             if (typeof after === 'function') {
                after(obj)
             }
         } else {
            await next(...args)
         }

        return ret
      }  
  }
}
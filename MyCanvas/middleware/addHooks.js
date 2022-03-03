import Options from "../Options"
export default function(ret) {
  return function (next) {
      return async function(){
         if (!ret.isMounted) {
           throw new Error('未挂载')
         }
         const args = [].slice.call(arguments)
         const t =  args[args.length-1] 
         if (t && t instanceof Options) {
             const {before, after} = t 
             if (typeof before === 'function') {
                 before(ret)
             }
            await next(...args)
             if (typeof after === 'function') {
                after(ret)
             }
         } else {
            await next(...args)
         }

        return ret
      }  
  }
}
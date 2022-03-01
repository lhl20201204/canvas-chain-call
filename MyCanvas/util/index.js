import MyCanvas from "../index"
export default function genInstance (ret, next){
    return function () {
    return new MyCanvas({
        el: ret.el,
        ctx: ret.ctx,
        isMounted: ret.isMounted,
        promise: new Promise((resolve) => {
              ret.promise.then((res) => {
                  if (!next) {   
                     resolve()
                  } else {
                      (async ()=> {
                          await next(...arguments)
                           resolve() 
                      })()      
                  }
              }) 
        }) 
      })       
  }
}
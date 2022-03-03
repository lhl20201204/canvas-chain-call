export default function genInstance (ret, next){
    return function () {
     const lastPromise = ret.promise
     ret.promise = new Promise((resolve) => {
             lastPromise.then((res) => {
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
    return ret   
  }
}
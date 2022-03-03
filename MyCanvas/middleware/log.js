const logger = true
import genInstance from "../util"
export default function(ret) {
    return function (next) {
        return function f (){  
          if(logger) {
            console.log('代理'+f.fnName + '函数')
          }
          return genInstance(ret, next)(...arguments)
        }  
    }
}
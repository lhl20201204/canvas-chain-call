import genInstance from "../util"
export default function(ret) {
    return function (next) {
        return function f (){  
          return genInstance(ret, next)(...arguments)
        }  
    }
}
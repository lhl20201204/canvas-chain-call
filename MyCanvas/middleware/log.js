const logger = false
import createGenInstanceFn from "../createGenInstanceFn"

export default function (ret) {
  return function (next) {
    return function f () {
      if (logger) {
        console.log('代理' + f.fnName + '函数')
      }
      return createGenInstanceFn(ret, f.fnName, next)(...arguments) // 方便获取参数
    }
  }
}
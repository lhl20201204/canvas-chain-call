
export default function createGenInstanceFn(ret, fnName, next) {
  return function () {
    let lastPromise = ret.promise // 链式调用核心
    const newPromise = new Promise((resolve) => {
      lastPromise.then((res) => {
        if (!next) {
          resolve({
            fnName,
            arguments
          })
        } else {
          (async () => {
            await next(...arguments)
            lastPromise = null
            resolve({
              fnName,
              arguments
            })
          })()
        }
      })
    })
    ret.promise = newPromise
    ret.history.push(ret.promise)
    Promise.resolve('注释：这里链式调用都是同步的，假设下个微任务队列如果没有新的promise，则说明所有线程结束了').then(() => {
      if (ret.promise === newPromise) {
        ret.promise.then(() => {
          ret._end()
        })
      }
    })
    return ret
  }
}
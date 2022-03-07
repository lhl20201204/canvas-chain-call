const needHandles = ['move']
function addInitStatus (children) {
  if (Array.isArray(children)) {
    return children.forEach(e => {
      addInitStatus(e)
    })
  }
  if (children instanceof Object && !Reflect.has(children, 'initStatus') && Reflect.has(children, 'target')) {
    const { target, time = 1000, initStatus, endStatus, concurrent = false, ...rest } = children
    children.initStatus = { ...children.target }
    children.endStatus = { ...children.target, ...rest }
  }
}
export default function createGenInstanceFn (ret, fnName, next) {
  return function () {
    const lastPromise = ret.promise // 链式调用核心
    const newPromise = new Promise((resolve) => {
      lastPromise.then((res) => {
        if (!next) {
          resolve({
            fnName,
            arguments
          })
        } else {
          (async () => {

            let args = [...arguments]
            const t = args[0]
            if (needHandles.includes(fnName) && !t.hasAddInitSatus) {
              addInitStatus(t)
              Object.defineProperty(t, "hasAddInitSatus", {
                value: true,
                enumerable: false
              })
            }
            await next(...arguments)
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
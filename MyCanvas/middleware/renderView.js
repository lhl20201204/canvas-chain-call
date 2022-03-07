const needRefresh =  ['move', 'remove']
export default function (ret) {
  const { controller } = ret
  return function (next) {
    return async function f () {
      if (!controller.isRefreshing) {
        controller.duty.splice(0 , controller.duty.length) 
      }
      if (needRefresh.includes(f.fnName)) {
        const promise = next(...arguments)
        controller.duty.push(promise) 
        controller.refresh()
        await promise
      } else {
        await next(...arguments)
      }
    }
  }
}
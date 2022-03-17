
let id = 0 
export default class Dynamic {
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw new Error('必须传一个参数')
        }
        this.id = id++
        this.fn = fn
        this.cache = null
        this.resultStack = []
        
    }

    pushResult(ret) {
        // console.log('加入一个')
        const rets = this.fn(ret)
        this.cache = rets
        this.resultStack.push(rets)
    }

    popResult(ret) {
    //    console.log('推出一个')
       this.cache = this.resultStack.pop()
    }
}
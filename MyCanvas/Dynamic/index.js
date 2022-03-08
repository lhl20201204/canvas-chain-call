
let id = 0 
export default class Dynamic {
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw new Error('必须传一个参数')
        }
        this.id = id++
        this.fn = fn
        this.cache = null
        
    }

    getResult() {
        this.cache = this.fn()
    }
}
export function watch(obj, attr, x = obj[attr]) {

    Object.defineProperty(obj, attr, {
        get() {
            return x
        },
        set(v) {
            console.log('设置值', v)
            x = v
        }
    })
}
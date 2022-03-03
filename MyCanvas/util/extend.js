
export function extendPrototype (newI, oldI) {
    Reflect.setPrototypeOf(newI, Reflect.getPrototypeOf(oldI))
}
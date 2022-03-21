
import Dynamic from "../../Dynamic";
import Shape from "../index";
export default class Group extends Shape {
    constructor(options = {}) {
        super({
            ...options,
            type: 'Group' // 在shape/index的remove判断类型因为循环引用时未初始化，无法通过instanceof 判断，故多加这个type
        })

        Object.defineProperty(this, "children", {
            value: [],
            enumerable: false
        })

        Object.defineProperty(this, "usedElements", {
            value: [],
            enumerable: false
        })

    }

    draw(ctx) {
        const { children, alpha, fillStyle, strokeStyle, isChildSelfAlpha = false, isChildSelfColor = false } = this
        for (const child of children) {
            if (!isChildSelfAlpha) {
                child.alpha = alpha
            }
            if (!isChildSelfColor) {
                child.fillStyle = fillStyle
                child.strokeStyle = strokeStyle
            }

            child.draw(ctx)
        }
    }

}


function _hadIn(target) { // array可能会改成map
    return Array.isArray(target.container.value)
}

function add(child) {
    if (!child) {
        throw new Error('不能加空的')
    }
    if (child instanceof Dynamic) {
        child = child.cache
    }

    if (Array.isArray(child)) {
        return child.map(v => add.call(this, v))
    }
    const { children, usedElements } = this
    if (!this._hadIn(child)) {
        child._mountedInGroup(this)
        children.push(child)
        usedElements.push(child)
    }
}

Group.prototype._hadIn = _hadIn
Group.prototype.add = add



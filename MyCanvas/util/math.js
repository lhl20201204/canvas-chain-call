export function bezierCurve(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * t * (1 - t) * p1 + t * t * p2
}


export function getTotalRotate(cur) {
    let ret = cur.rotate
    let t = cur.parent.value
    while (t) {
        ret += t.rotate
        t = t.parent.value
    }
    return ret
}

function getTotalScale(cur, attr) {
    let ret = 1
    let t = cur
    while (t) {
        ret *= t[attr]
        t = t.parent.value
    }
    return ret
}

export function getTotalScaleX(cur) {
    return getTotalScale(cur, 'scaleX')
}

export function getTotalScaleY(cur) {
    return getTotalScale(cur, 'scaleY')
}

export function getTotalAttr(cur) {
    let retScaleX = 1
    let retScaleY = 1
    let retRotate = 0
    let t = cur
    while (t) {
        retScaleX *= t.scaleX
        retScaleY *= t.scaleY
        retRotate += t.rotate
        t = t.parent.value
    }
    return {
        scaleX: retScaleX,
        scaleY: retScaleY,
        rotate: retRotate
    }

}

export function getTotalXY(cur) {
    let retX = 0
    let retY = 0
    let t = cur
    while (t) {
        let { scaleX, scaleY, rotate } = getTotalAttr(t.parent.value)
        let x = t.x * scaleX
        let y = t.y * scaleY

        let sinV = Math.sin(rotate)
        let cosV = Math.cos(rotate)
        retX += (x * cosV - y * sinV)
        retY += (y * cosV + x * sinV)
        t = t.parent.value
    }
    return {
        x: retX,
        y: retY
    }

}
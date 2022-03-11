export default function bezierCurve (p0, p1, p2, t) {
    return (1-t)*(1-t)*p0 + 2*t*(1-t)*p1 + t*t*p2
}
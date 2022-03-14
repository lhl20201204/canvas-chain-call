
import Shape from "../index";
export default class Group extends Shape {
    constructor(options ={}) {
        super({
          type:'Group', // 在shape/index的remove判断类型因为循环引用时未初始化，无法通过instanceof 判断，故多加这个type
          children: [],
          ...options
        })
      }

   draw(ctx) {
       const { children ,alpha, fillStyle, strokeStyle } = this
       for(const child of children) {
           child.alpha = alpha
           child.fillStyle =fillStyle
           child.strokeStyle = strokeStyle
           child.draw(ctx)
       }       
   }

}


function _hadIn(target, parent= this.children ) {
   for( const x of parent) { 
       if (x.id === target.id || ((x instanceof Group) && _hadIn(target, x.children))) {
           return true
       }
   }
   return false
}

function add ( child) {
    if(Array.isArray(child)) {
        return child.map(v => add.call(this, v))
    }
    const { children } = this

    if (!this._hadIn(child)) {
        child.isInGroup.value = true
        child.animations.value = this.animations.value
        child.parent = this
        children.push(child)
    }
}


Group.prototype._hadIn =_hadIn
Group.prototype.add = add



import { extendOptions } from "../util/extend";
let id = 0
export default class Watch {
    constructor(options) {
       extendOptions(this, options) 
       this.callbacks = {
       } 
    }
    
    on(target, fn) {
        if(!Reflect.has(this.callbacks, target.id)) {
          this.callbacks[target.id] = []
        }
        if(!Reflect.has(this.controller.addEventListenerTargets, target)) {
            this.controller.addEventListenerTargets.push(target)
        }
        target.hadAddListener.value = true
        if (!Reflect.has(fn, 'id')) {
            Object.defineProperty(fn, "id", {
                value: id ++,
                enumerable: false
              })
        }
        this.callbacks[target.id].push(fn)
    }

    trigger(target, ...rest) {
      if(!Reflect.has(this.callbacks, target.id)) {
        return 
      }
      for( const fn of this.callbacks[target.id]) {
        fn(target, ...rest)
      }
    }

    remove( target,fn) {
        if(!Reflect.has(this.callbacks, target.id)) {
            return 
        }
     if(typeof fn === 'function') {
           this.callbacks[target.id].splice(this.callbacks[target.id].findIndex(v => v.id === fn.id), 1)
     }else{
        this.callbacks[target.id].splice(0,this.callbacks[target.id].length )
     }
      if(this.callbacks[target.id].length === 0) {
          target.hadAddListener.value =false
          const addEventListenerTargets =  this.controller.addEventListenerTargets
          addEventListenerTargets.splice(addEventListenerTargets.findIndex(v => v.id === target.id), 1)
      }
    }

    removeAllListener(target) {
       this.remove(target)
    }
}
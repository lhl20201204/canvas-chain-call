
export function flattern (array) {
  return array.reduce((p,v) => {
   if (Array.isArray(v)) {
     p.push(...flattern(v))
   }else {
     p.push(v)
   }
   return p
  }, [])
}

export function throttle(fn, delay) {
  var timer;
  return function () {
      if (timer) {
        return;
      }
      var _this = this;
      var args = arguments;
      
      timer = setTimeout(function () {
          fn.apply(_this, args);
          timer = null; 
      }, delay)
  }
}
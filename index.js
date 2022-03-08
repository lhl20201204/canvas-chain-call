import MyCanvas from "./MyCanvas";
import Rectangle from "./MyCanvas/Shape/Rectangle";
import Ellipse from "./MyCanvas/Shape/Ellipse";
import Controller from "./MyCanvas/Controller"
import Dynamic from "./MyCanvas/Dynamic";
class Child extends MyCanvas {

}
const canvas = document.getElementById('canvas')
function rand (x) {
  return Math.floor(Math.random() * x)
}
const controller =  new Controller({
   el: canvas
})

for (let i= 0; i < 10;i ++) {
  (
  () => {
    const _4rec1 = new Dynamic(() => new Rectangle({
     x: 30 + rand(200),
     y: 140,
     width: 1,
     height: 4,
     fillStyle: '#' + rand(0xffffff).toString(16)
  }))
  
  const _4balls = new Dynamic(() => new Array(12).fill(0).map((v, i) => {
    // console.log('生成', _4rec1.cache.x, _4rec1.cache.y)
    const rotate =  2 * Math.PI / 12 * i
    return new Ellipse({ 
      rotate,
      x: _4rec1.cache.x,
      y: _4rec1.cache.y,
      radiusX: 1,
      radiusY: 1,
      rotation: 0,
      fillStyle: _4rec1.cache.fillStyle,
      startAngle: 0,
      endAngle:  2*Math.PI,
      anticlockwise: false
    })
  })) 
  
  // console.log(_4rec1)
  let len = 20
  const _4 = new Child({
    auto: true,
    infinity: true,
    // reverse: true,
    controller
  })
  .wait(rand(4000))
  .add(_4rec1)
  .move(new Dynamic(() => ({ 
    target: _4rec1.cache,
    y: 20 + rand(50),
    time: 1000
  })))
  .removeDynamic(_4rec1)
  .add(_4balls)
  .call(()=> {
    len = 10 + rand(20)
  })
  .move(new Dynamic(() =>_4balls.cache.map((v, i)=>{
    const { rotate, x, y } = v  
    const sin = Math.sin(rotate) * len
    const cos = Math.cos(rotate) * len
    return {
      target: v,
      x: x + cos,
      y: y + sin,
      time: 1000
    }
  })))
  .removeDynamic(_4balls)

  })()
  }

// const rectangle = new Rectangle({
//   originX: 0.5,
//   originY: 0.5,
//   x: 20,
//   y: 20,
//   fillStyle: '#094323',
//   width: 30,
//   height: 40
// })


// const rectangle2 = new Rectangle({
//   rotate: Math.PI / 4,
//   x: 40,
//   y: 0,
//   width: 40,
//   height: 40
// })

// const ellipse = new Ellipse({
//   originX: 0.5,
//   originY: 0.5,
//   x: 70,
//   y: 30,
//   fillStyle: 'rgb(34,56,78)',
//   radiusX: 10,
//   radiusY: 10,
//   rotation: 0,
//   startAngle: 0,
//   endAngle: Math.PI,
//   anticlockwise: false
// })



// const balls = new Array(100).fill(0).map(v => {
//   const r = 2 + rand(4)
//   return new Ellipse({
//     originX: 0.5,
//     originY: 0.5,
//     x: 70 + rand(100),
//     y: 30 + rand(100),
//     fillStyle: 'rgb(' + rand(255) + ',' + rand(255) + ',' + rand(255) + ')',
//     radiusX: r,
//     radiusY: r,
//     rotation: 0,
//     startAngle: 0,
//     endAngle:  2*Math.PI,
//     anticlockwise: false
//   })

// })


// const _ = new Child({
//   controller,
//   reverse: true,
//   // auto: true,
//   infinity: true
// }).call(() => {
//   console.log('重新开始刷新')
// })
// .add(rectangle2)
//   .wait(1000)
//   .add(rectangle)
//   .wait(1000)
//   .move({
//     target: rectangle,
//     x: 50,
//     y: 50,
//     scaleX: 2,
//     time: 2000
//   })
//   .move([{
//     target: rectangle,
//     rotate: 2 * Math.PI,
//     originX: 0,
//     originY: 0,
//     alpha: 0,
//     time: 2000
//   },
//   {
//     target: rectangle2,
//     scaleX: 0.5,
//     fillStyle: '#00f0f0',
//     scaleY: 0.5
//   }
//   ])
//   .move({
//     target: rectangle,
//     x: 20,
//     y: 50,
//     scaleX: 0.5,
//     fillStyle: '#f0ff00',
//     alpha: 1,
//     time: 2000
//   })
//   .wait(1000)
//   .move({
//     target: rectangle,
//     fillStyle: '#f00f30',
//     x: 0,
//     y: 0
//   })
//   .wait(1000)
//   .remove([rectangle2, rectangle])
//   .add(ellipse)
//   .move({
//     target: ellipse,
//     rotate: Math.PI,
//     fillStyle: '#00ff00',
//     endAngle: 2* Math.PI,
//     time: 1000
//   })
//   .add(balls)
//   .move(new Dynamic(() => [[balls.map(v => {
//     return {
//       target: v,
//       ...v,
//       x: rand(300),
//       y: rand(100),
//       time: 1000 + rand(1000)
//     }
//   })]])) 



// const rectangle3 = new Rectangle({
//   originX: 0.5,
//   originY: 0.5,
//   x: 120,
//   y: 20,
//   fillStyle: '#194ff3',
//   width: 30,
//   height: 60
// })


// const rectangle4 = new Rectangle({
//   rotate: Math.PI / 4,
//   x: 150,
//   y: 0,
//   width: 30,
//   height: 30
// })

// const _2 = new Child({
//   controller,
//   // auto: true,
//   // loop:3,
//   reverse:true,
//   infinity: true
// })
//    .add(rectangle4)
//   .add(rectangle3)
//   .move({
//     target: rectangle3,
//     x: 80,
//     y: 20,
//     scaleX: 1.5,
//     time: 1000
//   })
//   .move([{
//     target: rectangle3,
//     rotate: 2 * Math.PI,
//     originX: 0,
//     originY: 0,
//     time: 1000
//   },
//   {
//     target: rectangle4,
//     scaleX: 1,
//     fillStyle: '#00f0f0',
//     scaleY: 0.5,
//     time: 1000
//   }
//   ])
//   .move({
//     target: rectangle3,
//     x: 120,
//     y: 50,
//     scaleX: 0.5,
//     fillStyle: '#f0ff0f',
//     time: 1000
//   })
//   .move({
//     target: rectangle3,
//     fillStyle: '#ff0030',
//     x: 90,
//     y: 0
//   })
// // _._start()
// setTimeout(() => {
//   // _._start()
// }, 2000)


// const rec1 = new Rectangle({
//   x: 200,
//   y: 120,
//   height: 20,
//   width: 30,
//   originX: 0.5,
//   originY: -2,
// })

// const rec2 = new Rectangle({
//   x: 100,
//   y: 100,
//   height: 20,
//   width: 30,
//   originX: 0.5,
//   originY: -2,
// })

// const eli1 = new Ellipse({
//   originX: 0.5,
//   originY: -4,
//   x: 170,
//   y: 120,
//   radiusX: 10,
//   radiusY: 10,
//   rotation: 0,
//   startAngle: 0,
//   endAngle:  2*Math.PI,
//   anticlockwise: false
// })

// const eli2 = new Ellipse({
//   originX: 0.5,
//   originY: -4,
//   x: 170,
//   y: 100,
//   radiusX: 5,
//   radiusY: 5,
//   rotation: 0,
//   startAngle: 0,
//   endAngle:  2*Math.PI,
//   anticlockwise: false
// })

// const eli3 = new Ellipse({
//   originX: 0.5,
//   originY: -12,
//   x: 170,
//   y: 140,
//   radiusX: 5,
//   radiusY: 5,
//   rotation: 0,
//   startAngle: 0,
//   endAngle:  2*Math.PI,
//   anticlockwise: false
// })

// new Child({
//   controller,
//   auto: true,
//   infinity: true
// })
// .move([{
//   target: eli2,
//   rotate: 6 *Math.PI,
//   time: 8000
// },{
//   target: eli1,
//   rotate: -4 *Math.PI,
//   time: 8000
// }, {
//   target: eli3,
//   rotate: 2 * Math.PI,
//   time: 8000
// }])

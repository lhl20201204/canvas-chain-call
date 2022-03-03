import MyCanvas from "./MyCanvas";
import Rectangle from "./MyCanvas/Shape/Rectangle";
import Options from "./MyCanvas/Options";
import Ellipse from "./MyCanvas/Shape/Ellipse";
const rectangle = new Rectangle({
    originX: 0.5,
    originY: 0.5,
    x: 20,
    y: 20,
    fillStyle: '#094323',
    width: 30,
    height: 40
})


const rectangle2 = new Rectangle({
    rotate: Math.PI/4,
    x: 40,
    y: 0,
    width: 40,
    height: 40
})

const ellipse = new Ellipse({
    originX: 0.5,
    originY: 0.5,
    x:70,
    y:30,
    fillStyle: 'rgb(34,56,78)',
    radiusX:10,
    radiusY:10,
    rotation: 0,
    startAngle: 0,
    endAngle:  Math.PI,
    anticlockwise:false
})

const canvas = document.createElement('canvas')
canvas.style.width ='100vw'
canvas.style.height = '100vh'
document.body.appendChild(canvas)

const _ = new MyCanvas({
  el: canvas
})
.add(rectangle2)
    .wait(1000)
    .add(rectangle, new Options({
        before() {
        console.log('添加前的钩子')
        }
    }))
    .wait(1000)
    .move({
      target: rectangle,
      x: 50,
      y: 50,
      scaleX: 2,
      time: 2000
    })
    .call(()=> {
     console.log(new Date())
    })
    .move([{
        target: rectangle,
        rotate: 2 * Math.PI, 
        originX: 0,
        originY: 0,
        time: 2000
      },
      {
        target: rectangle2,
        scaleX: 0.5,
        scaleY: 0.5
      }
    ]) 
    .call(()=> {
        console.log(new Date())
    })
    .move({
        target: rectangle,
        x: 20,
        y: 50,
        scaleX: 0.5, 
        fillStyle: '#f0ff00',  
        time: 2000
    })
    .wait(1000) 
    .move({
        target: rectangle,
        x: 0,
        y: 0
    })
    .wait(1000) 
    .remove([rectangle2, rectangle])
    .add(ellipse)
    .move({
      target: ellipse,
      rotate: Math.PI,
      fillStyle: '#00ff00',
      time: 1000
    })
    
function rand(x) {
  return Math.floor(Math.random() * x)
}
const len = 100
let x = []

for(let i=0;i<len;i++) {
  x.push(i)
}
 const balls = x.map(v => {
  const r = 2+ rand(4)
  return new Ellipse({
    originX: 0.5,
    originY: 0.5,
    x:70 + rand(100),
    y:30 + rand(100),
    fillStyle: 'rgb('+rand(255)+','+rand(255)+','+rand(255)+')',
    radiusX:r,
    radiusY:r,
    rotation: 0,
    startAngle: 0,
    endAngle:  2*Math.PI,
    anticlockwise:false
})

 })

  const canvas2 = new MyCanvas({
    el:canvas,
    promise: _.promise
  })
  .add(balls)
  .move(balls.map(v => {
    return {
      target: v,
      ...v,
      x: rand(300),
      y: rand(100),
      time: 5000+rand(10000)
    }
  }))


    
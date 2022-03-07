import MyCanvas from "./MyCanvas";
import Rectangle from "./MyCanvas/Shape/Rectangle";
import Options from "./MyCanvas/Options";
import Ellipse from "./MyCanvas/Shape/Ellipse";
import Controller from "./MyCanvas/Controller"


class Child extends MyCanvas {

}

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
  rotate: Math.PI / 4,
  x: 40,
  y: 0,
  width: 40,
  height: 40
})

const ellipse = new Ellipse({
  originX: 0.5,
  originY: 0.5,
  x: 70,
  y: 30,
  fillStyle: 'rgb(34,56,78)',
  radiusX: 10,
  radiusY: 10,
  rotation: 0,
  startAngle: 0,
  endAngle: Math.PI,
  anticlockwise: false
})

const canvas = document.getElementById('canvas')
function rand (x) {
  return Math.floor(Math.random() * x)
}
const len = 1000
let x = []

for (let i = 0; i < len; i++) {
  x.push(i)
}
const balls = x.map(v => {
  const r = 2 + rand(4)
  return new Ellipse({
    originX: 0.5,
    originY: 0.5,
    x: 70 + rand(100),
    y: 30 + rand(100),
    fillStyle: 'rgb(' + rand(255) + ',' + rand(255) + ',' + rand(255) + ')',
    radiusX: r,
    radiusY: r,
    rotation: 0,
    startAngle: 0,
    endAngle:  2*Math.PI,
    anticlockwise: false
  })

})
const controller =  new Controller({
   el: canvas
})

const _ = new Child({
  controller,
  reverse: true,
  // auto: true,
  infinity: true
}).add(rectangle2)
  .wait(1000)
  .add(rectangle, new Options({
    before () {
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
  .call(() => {
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
    fillStyle: '#00f0f0',
    scaleY: 0.5
  }
  ])
  .call(() => {
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
    fillStyle: '#f00f30',
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
  .add(balls)
  .move(balls.map(v => {
    return {
      target: v,
      ...v,
      x: rand(300),
      y: rand(100),
      time: 1000 + rand(1000)
    }
  }))

setTimeout(() => {
  _._start()
}, 2000)


const rectangle3 = new Rectangle({
  originX: 0.5,
  originY: 0.5,
  x: 120,
  y: 20,
  fillStyle: '#194ff3',
  width: 30,
  height: 60
})


const rectangle4 = new Rectangle({
  rotate: Math.PI / 4,
  x: 150,
  y: 0,
  width: 30,
  height: 30
})

const _2 = new Child({
  controller,
  auto: true,
  // loop:3
  reverse:true,
  infinity: true
})
   .add(rectangle4)
  .add(rectangle3, new Options({
    before () {
      console.log('添加前的钩子')
    }
  }))
  .move({
    target: rectangle3,
    x: 80,
    y: 20,
    scaleX: 1.5,
    time: 1000
  })
  .move([{
    target: rectangle3,
    rotate: 2 * Math.PI,
    originX: 0,
    originY: 0,
    time: 1000
  },
  {
    target: rectangle4,
    scaleX: 1,
    fillStyle: '#00f0f0',
    scaleY: 0.5,
    time: 1000
  }
  ])
  .move({
    target: rectangle3,
    x: 120,
    y: 50,
    scaleX: 0.5,
    fillStyle: '#f0ff0f',
    time: 1000
  })
  .move({
    target: rectangle3,
    fillStyle: '#ff0030',
    x: 90,
    y: 0
  })
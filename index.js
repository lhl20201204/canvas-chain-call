import MyCanvas from "./MyCanvas";
import Rectangle from "./MyCanvas/Shape/Rectangle";
import Ellipse from "./MyCanvas/Shape/Ellipse";
import Controller from "./MyCanvas/Controller"
import Dynamic from "./MyCanvas/Dynamic";
import Text from "./MyCanvas/Shape/Text";
import Texture from "./MyCanvas/Shape/Texture";
import Group from "./MyCanvas/Shape/Group";
class Child extends MyCanvas {
}
const canvas = document.getElementById('canvas')
function rand (x) {
  return Math.floor(Math.random() * x)
}
const controller =  new Controller({
   el: canvas,
   longFail: true // 长尾特效是否开启s
})

let c = {
  _1: null,
  _2:null,
  _3:null,
  _4:null,
  _5: null,
  _6: null,
  _7: []
}


;((c)=> {
  const rec1 = new Rectangle({
    x: 20,
    y: 20,
    width: 20,
    height: 40  
  })

  const rec2 = new Rectangle({
    x: 20,
    y: 20,
    rotate: -Math.PI / 4,
    // originX: 0.5,
    // originY: 0.5,
    width: 20,
    height: 40  
  })

  c._1 = new Child({
   controller,
  //  auto: true
 })
//  .add(rec1)
 .add(rec2)
 .wait(2000)
 .move([
  //  {
  //  target: rec1,
  //  rotate: 2 * Math.PI,
  //  time: 2000
  // }, 
 {
   target: rec2,
   rotate:  2 *Math.PI,
   time: 2000
 }])


})(c);

;((c)=> {
  const rec1 = new Rectangle({
    x: 30,
    y: 30,
    height: 10,
    width: 30
  })

  const rec2 = new Rectangle({
    // rotate: Math.PI,
    height: 10,
    width: 30,
    scaleX: 0.5,
    scaleY: 0.5,
  })

  const rec3 = new Rectangle({
    x: 15,
    y: 5,
    // rotate: Math.PI,
    height: 10,
    width: 30,
    // scaleX: 0.5,
    // scaleY: 0.5,
  })


  const group = new Group({
    x: 120,
    y: 60,
    rotate: Math.PI /2 ,
    scaleX: 2,
    scaleY: 2,
    fillStyle: '#ff0ff0'
  })
  // console.log(group)

  group.add([rec2, rec3]) 


   c._2 = new Child({
    controller,
    // auto: true,
    infinity: true,
    reverse: true,
    // loop: 3
  })
  //  .add(rec1)
  //  .move({
  //   target: rec1,
  //   rotate: Math.PI,
  // })
  .add(group)
  // .call(() => {
  //   // console.log({...rec2})
  // })
  .move(
  [ 
    {
    target: group,
    rotate: 5*Math.PI/2,
    scaleX: 1,
    scaleY: 1,
    time: 3000
    },
    {
      target: rec3,
      rotate: Math.PI / 2,
      time: 3000
    },
  ]
  )
  // .wait(1000)

})(c);

;((c) => {
const image = new Texture({
      src: './example1.jpg',
      originX: 1,
      originY: 0.5,
      width: 90,
      height: 50
    })

    c._3 = new Child({
      // auto:true,
      controller
    })
    .add(image)
    .wait(1000)
    .move({
      target: image,
      rotate: - Math.PI /2,
      time: 2000
    })
    .remove(image)
})(c);

 
;((c)=> {
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



const balls = new Array(100).fill(0).map(v => {
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


 c._4 = new Child({
  controller,
  reverse: true,
  // auto: true,
  infinity: true
}).call(() => {
  console.log('重新开始刷新')
})
.add(rectangle2)
  .wait(1000)
  .add(rectangle)
  .wait(1000)
  .move({
    target: rectangle,
    x: 50,
    y: 50,
    scaleX: 2,
    time: 2000
  })
  .move([{
    target: rectangle,
    rotate: 2 * Math.PI,
    originX: 0,
    originY: 0,
    alpha: 0,
    time: 2000
  },
  {
    target: rectangle2,
    scaleX: 0.5,
    fillStyle: '#00f0f0',
    scaleY: 0.5
  }
  ])
  .move({
    target: rectangle,
    x: 20,
    y: 50,
    scaleX: 0.5,
    fillStyle: '#f0ff00',
    alpha: 1,
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
    endAngle: 2* Math.PI,
    time: 1000
  })
  .add(balls)
  .move(new Dynamic(() => [[balls.map(v => {
    return {
      target: v,
      ...v,
      x: rand(300),
      y: rand(100),
      time: 1000 + rand(1000)
    }
  })]])) 

})(c);

;((c)=>{
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

c._5 = new Child({
  controller,
  // auto: true,
  // loop:3,
  reverse:true,
  infinity: true
})
   .add(rectangle4)
  .add(rectangle3)
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
})(c);


;((c)=>{
const rec1 = new Rectangle({
  x: 200,
  y: 120,
  height: 20,
  width: 30,
  originX: 0.5,
  originY: -2,
})

const rec2 = new Rectangle({
  x: 100,
  y: 100,
  height: 20,
  width: 30,
  originX: 0.5,
  originY: -2,
})

const eli1 = new Ellipse({
  originX: 0.5,
  originY: -4,
  x: 170,
  y: 120,
  radiusX: 10,
  radiusY: 10,
  rotation: 0,
  startAngle: 0,
  endAngle:  2*Math.PI,
  anticlockwise: false
})

const eli2 = new Ellipse({
  originX: 0.5,
  originY: -4,
  x: 170,
  y: 100,
  radiusX: 5,
  radiusY: 5,
  rotation: 0,
  startAngle: 0,
  endAngle:  2*Math.PI,
  anticlockwise: false
})

const eli3 = new Ellipse({
  originX: 0.5,
  originY: -12,
  x: 170,
  y: 140,
  radiusX: 5,
  radiusY: 5,
  rotation: 0,
  startAngle: 0,
  endAngle:  2*Math.PI,
  anticlockwise: false
})

c._6 = new Child({
  controller,
  // auto: true,
  infinity: true
})
.move([{
  target: eli2,
  rotate: 6 *Math.PI,
  time: 8000
},{
  target: eli1,
  rotate: -4 *Math.PI,
  time: 8000
}, {
  target: eli3,
  rotate: 2 * Math.PI,
  time: 8000
}])

})(c)

;((c) => {
  let count = 1
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
  
  const _4text = new Dynamic(({ctx}) => {
  const text =  new Text({
    fontSize: 5,
    // originX: 0.5,
    // originY: 0.25,
    fillStyle: _4rec1.cache.fillStyle,
    // content: _4rec1.cache.id,
    content: count++,
    x: _4rec1.cache.x,
    y: _4rec1.cache.y
  })
  text._caculate(ctx)
  text.x = text.x - text.width / 4
  return text
})
  const _4balls = new Dynamic(() => new Array(12).fill(0).map((v, i) => {
    // console.log('生成', _4rec1.cache.x, _4rec1.cache.y)
    const myRotate =  2 * Math.PI / 12 * i
    return new Ellipse({  
      myRotate,
      x: _4rec1.cache.x,
      y: _4rec1.cache.y,
      scaleX: 0.5,
      scaleY: 0.5,
      radiusX: 1,
      radiusY: 1,
      rotation: 0,
      fillStyle: _4rec1.cache.fillStyle,
      // fillStyle: '#' + rand(0xffffff).toString(16),
      startAngle: 0,
      endAngle:  2*Math.PI,
      anticlockwise: false
    })
  })) 

  const _4ballsCopy = controller.copyDynamic(_4balls, (t) => ({
  ...t,
  // rotate: t.rotate + Math.PI /4
  }))
   

  // console.log(_4rec1)
  let len = 20
  let color =  '#' + rand(0xffffff).toString(16)
  const _4 = new Child({
    // auto: true,
    // promise: a.promise,
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
  .add(_4text)
  .add(_4balls)
  .call(()=> {
    len = 20 + rand(20)
  })
  .add(controller.copyDynamic(_4text))
  .move(new Dynamic(() =>[
    {
      target: _4text.cache,
      rotate:   2*Math.PI,
    },
    ..._4balls.cache.map((v, i)=>{
    const { myRotate, x, y } = v  
    const sin = Math.sin(myRotate) * len
    const cos = Math.cos(myRotate) * len
    return {
      target: v,
      x: x + cos,
      y: y + sin,
      curve: {
        x: x + cos/2,
        y: y + sin/2  - 10 *(i - rand(6))
      },
      time: 1000
    }
  })
]))
  .removeDynamic([_4balls, _4text ])
  .call(()=> {
    len = len /2
  })
  .move(
    new Dynamic(() =>[
    ..._4balls.cache.map((v, i)=>{
    const { myRotate, x, y } = v  
    const sin = Math.sin(myRotate) * -len
    const cos = Math.cos(myRotate) * -len
    return {
      target: v,
      x: x + cos,
      y: y + sin,
      scaleX: 0.5,
      scaleY: 0.5,
      time: 1000
    }
    }),
   ])
  )
  .call(() => {
    for(const v of _4balls.cache) {
      const { myRotate } = v  
      const sin = Math.sin(myRotate) * len  
      const cos = Math.cos(myRotate) * len  
      v.x += cos / (v.radiusX) /2
      v.y += sin / (v.radiusY) /2
      v.originX = -cos / (v.radiusX) 
      v.originY = -sin / (v.radiusY) 
    }
  })

  .move(
    new Dynamic(() =>[
    ..._4balls.cache.map((v, i)=>{
    return {
      target: v,
      rotate: 2 * Math.PI ,
      // scaleX: 0.2,
      // scaleY: 0.2,
      time: 2000
    }
    }),
   ])
  )
   c._7.push(_4)  
  })()
  }
})(c);

// c._1._start()
// c._2._start()
// c._3._start()
// c._4._start()
// c._5._start()
// c._6._start()
for(const x of c._7) {
  x._start()
}
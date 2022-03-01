import MyCanvas from "./MyCanvas";
const _ = new MyCanvas()
    .mount(document.body)
    .drawRectangle(10, 20, 30, 40)
    .wait(1000)
    .drawRectangle(40, 60, 50, 50)
    .wait(1000)
    .drawEllipse(200, 80, 10, 15, 0, 0, 2 * Math.PI, true);


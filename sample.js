const { Canvas } = require("./src/Canvas");
const { CoordinateMap } = require("./src/drawables/diagrams/CoordinateMap");

const canvas = new Canvas(120,20,true);
const data = [
  {x:130, y:120, type:'A'}, 
  {x:170, y:130, type:'A'},
  {x:140, y:100, type:'A'},
  {x:130, y:130, type:'B'},
  {x:150, y:100, type:'B'},
  {x:160, y:90, type:'B'},
]
canvas.add(new CoordinateMap(10,2,90,15,10,data,'x', 'xLabel', 'y', 'yLabel', 'type', 'yellow', false));

canvas.render();
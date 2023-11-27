const { Line } = require('../basicElements/Line');
const { Point} = require('../basicElements/Point');
const { Drawable } = require('../base/Drawable');
const { Square } = require('../basicElements/Square');
const { Text } = require('../basicElements/Text');

class CoordinateMap extends Drawable {
  fromX; toX; fromY; toY; z;
  xAxis; yAxis; xLabel; yLabel;
  marks = ['o', 'x', '.' ]; marksMap={};
  dataPoints=[];
  dataLines=[];

  constructor(originX, originY, width, height, z, data, xKey, xLabel, yKey, yLabel, typeKey, color, lineUp) {
    super(color);
    const fromX = originX; const fromY = originY;
    const toX = originX+width; const toY = originY+height;
    this.fromX = fromX; this.toX=toX; this.fromY=fromY; this.toY=toY; this.z=z;
    // map data type to marks (cannot handle categorys more than this.marks.length)
    const totalTypes = [];
    data.forEach(d => !totalTypes.includes(d[typeKey])?totalTypes.push(d[typeKey]):'');
    totalTypes.forEach((t,i) => {
      this.marksMap[t] = this.marks[i%this.marks.length];
    })

    // x and y Axis
    this.xAxis = new Line(fromX,fromY, toX,fromY,z,color,'solid','_');
    this.yAxis = new Line(fromX,fromY, fromX,toY,z,color,'solid');

    // place x label and y label
    this.xLabel = new Text(this.toX+4,this.fromY,z,xLabel,'horizontal',color);
    this.yLabel = new Text(this.fromX-4,this.toY+2,z,yLabel,'horizontal',color);

    // add data points
    this.initData(data, xKey, yKey, typeKey, lineUp);

  }

  initData(data, xKey, yKey, typeKey, lineUp) {
    const extendedRange = 1; // extend range start and end by how many scales
    let maxX = Math.max(...data.map(d => d[xKey]));
    const xBit = maxX.toFixed(0).length + 2; // decided a max text length on X axis
    let minX = Math.min(...data.map(d => d[xKey]));
    let maxY = Math.max(...data.map(d => d[yKey]));
    let minY = Math.min(...data.map(d => d[yKey]));
    const xScale = (maxX-minX)/(this.toX-this.fromX - 2*extendedRange*xBit);
    const yScale = (maxY-minY)/(this.toY-this.fromY - 2*extendedRange);
    minY -= 1*extendedRange*yScale;
    maxY += 1*extendedRange*yScale;
    minX -= 1*extendedRange*xBit*xScale;
    maxX += 1*extendedRange*xBit*xScale;

    // draw numbers on axis
    for (let i=0; i<=this.toY-this.fromY; i++) {
      this.dataPoints.push(new Text(this.fromX-6,this.fromY+i,this.z,(minY+yScale*i).toFixed(1),'horizontal',this.color))
    }

    for (let i=0; i<=this.toX-this.fromX; i++) {
      if (i%(xBit+3)!==0) continue; 
      let xNumber = (minX+xScale*i).toFixed(0);
      if (xNumber.length > xBit) xNumber = xNumber.slice(0,xBit)+'...';
      this.dataPoints.push(new Text(this.fromX+i,this.fromY-1,this.z,xNumber,'horizontal',this.color))
    }

    if (lineUp) {
      // add by typeKey
      const keys = Object.keys(this.marksMap).sort((pre,next)=> pre>next?1:-1); //asc sort
      if (keys.length > 0) {
        keys.forEach(k => {
          const points = data.filter(d => d[typeKey]===k).sort((pre,next)=> pre[xKey]>next[xKey]?1:-1);
          if (points.length === 1) {
            const x = this.fromX+Math.ceil((points[0][xKey]-minX)/xScale); // magnet to next x scale
            const y = this.fromY+Math.ceil((points[0][yKey]-minY)/yScale);
            this.dataPoints.push(new Point(x, y, this.z, this.marksMap[k], this.color));
          }
          else {
            for (let i=0; i<points.length-1; i++) {
              const p1 = points[i]; let p2 = points[i+1];
              const line = new Line(
                this.fromX+Math.ceil((p1[xKey]-minX)/xScale),
                this.fromY+Math.ceil((p1[yKey]-minY)/yScale),
                this.fromX+Math.ceil((p2[xKey]-minX)/xScale),
                this.fromY+Math.ceil((p2[yKey]-minY)/yScale),
                this.z,this.color,'solid');
              this.dataLines.push(line);
            }
          }
        })
      }
    }

    // draw points
    for (let d of data) {
      const x = this.fromX+Math.ceil((d[xKey]-minX)/xScale); // magnet to next x scale
      const y = this.fromY+Math.ceil((d[yKey]-minY)/yScale);
      this.dataPoints.push(new Point(x, y, this.z+1, this.marksMap[d[typeKey]], this.color));
    }
    
  }

  toPixels() {
    const pixels = [];

    pixels.push(...this.yAxis.toPixels());
    pixels.push(...this.xAxis.toPixels());
    pixels.push(...this.xLabel.toPixels());
    pixels.push(...this.yLabel.toPixels());
    pixels.push(...this.dataLines.flatMap(ln => ln.toPixels()));
    pixels.push(...this.dataPoints.flatMap(p => p.toPixels()));

    // render legend
    const keys = Object.keys(this.marksMap).sort((pre,next)=> pre>next?1:-1); //asc sort
    if (keys.length > 0) {
      // // add surrounding 
      // points.push(... new Square(this.toX,this.toY-keys.length-2,this.z,10,keys.length+2,'solid',this,this.color).toPixels());

      keys.forEach((k,i) => {
        const legend = new Text(this.toX+4-k.length, this.toY+1-i, this.z, `${k} : ${this.marksMap[k]}`, 'horizontal', this.color)
        pixels.push(...legend.toPixels());
      })
    }
    
    return pixels;
  }
}

module.exports = {
  CoordinateMap
}
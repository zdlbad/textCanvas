const { Line } = require("./Line");
const { Drawable } = require("../base/Drawable");

class Square extends Drawable {
  x;y;z;width;height;style;
  
  constructor(x,y,z,width,height,style,color) {
    super(color);;
    this.x=x;
    this.y=y;
    this.z=z;
    this.width=width;
    this.height=height;
    this.style=style||'solid';
  }

  toPixels() {
    const top = new Line(this.x, this.y+this.height, this.x+this.width, this.y+this.height, this.z, this.color, this.style, '-');
    const bottom = new Line(this.x, this.y, this.x+this.width, this.y, this.z, this.color, this.style, '_');
    const left = new Line(this.x, this.y, this.x, this.y+this.height, this.z, this.color, this.style);
    const right = new Line(this.x+this.width, this.y, this.x+this.width, this.y+this.height, this.z, this.color, this.style);
    return [
      ...bottom.toPixels(),
      ...top.toPixels(),
      ...left.toPixels(),
      ...right.toPixels(),
    ]
  }
}

module.exports = {Square}
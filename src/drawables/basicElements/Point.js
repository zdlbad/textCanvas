const { Pixel } = require("../base/Pixel");
const { Drawable } = require("../base/Drawable");

class Point extends Drawable{
  x; 
  y; 
  z;
  pixelContent;

  constructor (x, y, z, pixelContent, color) {
    super(color);;
    this.x = x;
    this.y = y;
    this.z = z;
    this.pixelContent = pixelContent;
  }

  toPixels () {
    return [new Pixel(this.x, this.y, this.z, this.pixelContent, this.color)];
  }

}


module.exports = {
  Point
}
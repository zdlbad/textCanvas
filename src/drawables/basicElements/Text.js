const { Drawable } = require("../base/Drawable");
const {Pixel} = require('../base/Pixel');

class Text extends Drawable{
  x;y;z;
  direction;
  text = '';

  constructor(x,y,z, text, direction, color) {
    super(color);;
    this.x=x; this.y=y;this.z=z;
    this.direction = direction || 'horizontal';
    this.text = text;
  }

  toPixels() {
    const pixels = [];
    for (let i = 0; i < this.text.length; i++) {
      let pixel;
      if (this.direction === 'horizontal') {
        pixel = new Pixel(this.x+i, this.y, this.z, this.text[i], this.color);
      }
      else {
        pixel = new Pixel(this.x, this.y-i, this.z, this.text[i], this.color);
      }

      pixels.push(pixel)
    }
// console.log(this, points);
    return pixels;
  }

}

module.exports = {
  Text
}


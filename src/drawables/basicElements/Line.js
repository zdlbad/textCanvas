const { Drawable } = require("../base/Drawable");
const {Pixel} = require('../base/Pixel');

class Line extends Drawable{

  fromX; toX; fromY; toY; style; fill;

  /** Draw a line
   * 
   * @param {string} color 
   * @param {string} style 
   */
  constructor(x1,y1,x2,y2,z,color,style,fill) {
    super(color);;
    this.fill = fill;
    this.z = z;
    // from x1 to x2
    if (x1 <= x2) {
      this.fromX = x1; this.toX = x2;
      this.fromY = y1; this.toY = y2;
    } 
    else {
      this.fromX = x2; this.toX = x1;
      this.fromY = y2; this.toY = y1;
    }
    this.style = style || 'solid';
  }

  get k() {
    return (this.toY-this.fromY)/(this.toX-this.fromX); // >0, <0, =0, Infinity
  }

  /** Get symbol for a line
   * \u2502 :   |
   * \u2571 :   ╱
   * \u2572 :   ╲
   * \u2500 :   ─
   * 
   * @param {number} k 
   * @returns 
   */
  getFill(k) {
    if (this.fill) return this.fill;
    const angle = Math.atan(k) * 180/Math.PI; // Math.atan(Infinity)*180/Math.PI => 90
    // from -90 to 90
    if (angle >= 75) return '|';
    if (angle >= 15) return '/';
    if (angle >= -15) return '-';
    if (angle >= -75) return '\\';
    if (angle < -75) return '|';

  }

  toPixels () {
    const pixels = [];
    if (Math.abs(this.k) === Infinity) {
      for (let y=Math.min(this.fromY, this.toY); y<=Math.max(this.fromY, this.toY); y++) {
        pixels.push(new Pixel(this.fromX, y, this.z, '|', this.color));
      }
      return pixels;
    }

    for (let x = this.fromX; x <= this.toX; x++) {
      const y = this.fromY + Math.floor((x-this.fromX)*this.k);
      
      // check whether need to fill gap
      const nextPixel = {x:x+1, y:this.fromY + Math.floor((x+1-this.fromX)*this.k)};
      // decide what to fill for this point
      const prePixel = {x:x-1, y:this.fromY + Math.floor((x-1-this.fromX)*this.k)};
      const tempK = (nextPixel.y-prePixel.y)/(nextPixel.x-prePixel.x);
      const fill = this.getFill(tempK);
      pixels.push(new Pixel(x, y, this.z, fill, this.color));

      // gap found, fill gap
      const yGap = Math.abs(nextPixel.y - y) - 1; // how many numbers in between
      if (yGap >= 1) { 
        for (let i=1; i<=yGap; i++) {
          pixels.push(new Pixel(x, y+i, this.z, '|', this.color));
        }
      }
    }
    
    return pixels;
  }

}


module.exports = {
  Line
}
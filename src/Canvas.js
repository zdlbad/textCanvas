const { Drawable } = require("./drawables/base/Drawable");

class Canvas {
  xPace=1;
  yPace=1;
  width;
  length;
  pixels; 
  xSurrounding = '\u2501'; //'\u2550';
  xSpaceFill = ' '; 
  ySurrounding = '\u2503'; // '\u2551';
  ySpaceFill = ' '; 
  enableColor = true;

  constructor(width, length, enableColor) {
    this.width = width || 10;
    this.length = length || 10;
    this.enableColor = enableColor;
    this.pixels = [];
  }

  /**
   * 
   * @param {Drawable} shape 
   */
  add (shape) {
    this.pixels.push(...shape.toPixels());
  }

  getColorCode (color) {
    switch(color) {
      case 'cyan': return 36;
      case 'yellow': return 33;
      case 'red': return 31;
      default: return 0;
    }
  }

  render() {
    // resolve point to pixel matrix   
    const pixelContentMatrix = [];
    
    // render to matrix
    // x0 y0 => left bottom
    for (let y = this.length-1; y >= 0; y--) {
      for (let x = 0; x < this.width; x++) {
        // find point (this can be improved by sorting points first by y asc, x asc)
        const originPixels = this.pixels.filter(p => p.x === x && p.y === y);
        let topPixel = originPixels.sort((pre, next) => next.z - pre.z)[0]; // desc sort on z  
        let pixelContent = this.xSpaceFill;
        if (topPixel) {
          pixelContent = topPixel.pixelContent;
          if (this.enableColor) {
            pixelContent = `\x1b[${this.getColorCode(topPixel.color)}m${pixelContent}\x1b[0m`
          }
        }
        pixelContentMatrix.push(pixelContent.padEnd(this.xPace, this.xSpaceFill));
      }
    }
    
    // print metrix
    console.log('\u250F'+ ''.padEnd(this.width * this.xPace, this.xSurrounding) + '\u2513');
    // console.log('\u2554'+ ''.padEnd(this.width * this.xPace, this.xSurrounding) + '\u2557');
    while (pixelContentMatrix.length > 0) {
      const oneLine = this.ySurrounding + pixelContentMatrix.splice(0, this.width).join('') + this.ySurrounding;
      console.log(oneLine);
    }
    console.log('\u2517'+ ''.padEnd(this.width * this.xPace, this.xSurrounding) + '\u251B');
    // console.log('\u255A'+ ''.padEnd(this.width * this.xPace, this.xSurrounding) + '\u255D');
  }

}

module.exports = {Canvas}
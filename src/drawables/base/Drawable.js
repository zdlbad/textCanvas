const { Pixel } = require("./Pixel");

class Drawable {
  color;

  constructor(color) {
    this.color = color;
  }

  /**
   * 
   * @returns {Pixel[]} pixels 
   */
  toPixels() {
    return [];
  }
}

module.exports = { Drawable };
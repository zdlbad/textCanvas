class Pixel {
  x; 
  y; 
  z;
  pixelContent;
  color;

  constructor (x, y, z, pixelContent, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pixelContent = pixelContent;
    this.color = color;
  }

}


module.exports = {
  Pixel
}
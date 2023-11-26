const { Canvas } = require("./src/Canvas");
const { Point } = require("./src/drawables/basicElements/Point");
const { Line } = require("./src/drawables/basicElements/Line");
const { Text } = require("./src/drawables/basicElements/Text");
const { Square } = require("./src/drawables/basicElements/Square");
const { CoordinateMap } = require("./src/drawables/diagrams/CoordinateMap");


module.exports = {
  Canvas,
  // basic elements
  Point,
  Line,
  Text,
  Square,
  // diagrams
  CoordinateMap,
}
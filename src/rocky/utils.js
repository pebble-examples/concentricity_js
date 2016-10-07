// Copyright [2016] Pebble Technology

var PADDING = 10;
var NUM_ARCS = 3;

var calculateInset = function(canvasWidth, arcId) {
  return (getStrokeWidth(canvasWidth) + PADDING) * arcId;
};

var getStrokeWidth = function(canvasWidth) {
  return ((canvasWidth / NUM_ARCS) / 2) - PADDING;
};

var calculateOuterRadius = function(arcId, canvasWidth) {
  return (canvasWidth / 2) - ((getStrokeWidth(canvasWidth) + PADDING) * arcId);
};

module.exports = {
  getStrokeWidth: getStrokeWidth,
  calculateInset: calculateInset,
  calculateOuterRadius: calculateOuterRadius
};
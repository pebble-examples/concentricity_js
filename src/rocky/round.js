// Copyright [2016] Pebble Technology
var utils = require('./utils');

var timeAngle = function(time) {
  return time * (2 * Math.PI / 60);
};
var hourAngle = function(hour) {
  return hour * (2 * Math.PI / 12);
};

// Draw an arc with given inner/outer radii
var drawArc = function(ctx, arcId, endAngle, color) {
  var startAngleOffset = Math.PI / 2;
  var canvasWidth = ctx.canvas.unobstructedWidth;
  var centerX = canvasWidth / 2;
  var centerY = ctx.canvas.unobstructedHeight / 2;

  var strokeWidth = utils.getStrokeWidth(canvasWidth);
  var outerRadius = utils.calculateOuterRadius(arcId, canvasWidth);

  // Set the drawing color
  ctx.fillStyle = color;

  if (endAngle === 0) {
    ctx.rockyFillRadial(centerX, centerY, outerRadius - strokeWidth, outerRadius,
      -startAngleOffset, (2 * Math.PI) - startAngleOffset);
  } else {
    ctx.rockyFillRadial(centerX, centerY, outerRadius - strokeWidth, outerRadius,
      -startAngleOffset, endAngle - startAngleOffset);
  }
};

// Handle representation for hours
var drawHours = function(ctx, hours, color) {
  drawArc(ctx, 2, hourAngle(hours % 12), color);
};

// Handle representation for minutes
var drawMinutes = function(ctx, minutes, color) {
  drawArc(ctx, 1, timeAngle(minutes), color);
};

// Handle representation for seconds
var drawSeconds = function(ctx, seconds, color) {
  drawArc(ctx, 0, timeAngle(seconds), color);
};

module.exports = {
  drawHours: drawHours,
  drawMinutes: drawMinutes,
  drawSeconds: drawSeconds
};

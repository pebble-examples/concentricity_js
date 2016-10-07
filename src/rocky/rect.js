// Copyright [2016] Pebble Technology
var utils = require('./utils');

var drawBorder = function(ctx, arcId, segment, totalSegments, color){
  // Calculate x, y, width, height of border
  var canvasWidth = ctx.canvas.unobstructedWidth;
  var canvasHeight = ctx.canvas.unobstructedHeight;
  var centerX = canvasWidth / 2;
  var centerY = canvasHeight / 2;
  var inset = utils.calculateInset(canvasWidth, arcId);

  var x = centerX - (canvasWidth / 2) + inset;
  var y = centerY - (canvasHeight / 2) + inset;
  var width = centerX + (canvasWidth / 2) - (inset * 2);
  var height = centerY + (canvasHeight / 2) - (inset * 2);
  var strokeWidth = utils.getStrokeWidth(canvasWidth);

  // Calculate max no of pixels in perimeter less the size of the border at
  // the four corners
  var perimeterMax = ((width * 2) + (height * 2)) - (strokeWidth * 4);

  // Calculate the corners
  var topRight = width / 2;
  var bottomRight = topRight + height - strokeWidth;
  var bottomLeft = bottomRight + width - strokeWidth;
  var topLeft = bottomLeft + height - strokeWidth;

  // Calculate our current position around the perimeter
  var perimeterPosition = (segment * perimeterMax) / totalSegments;

  // Make sure we don't exceed maximum
  if (perimeterPosition > perimeterMax) {
    perimeterPosition = perimeterMax;
  }

  // Set the drawing color
  ctx.fillStyle = color;

  // Prefill any completed sides
  // Prefill top right
  if (perimeterPosition > topRight) {
    ctx.fillRect((width / 2) + x, y, width / 2, strokeWidth);
  }

  // Prefill right
  if (perimeterPosition > bottomRight) {
    ctx.fillRect(width - strokeWidth + x, strokeWidth + y, strokeWidth, height - strokeWidth);
  }

  // Prefill bottom
  if (perimeterPosition > bottomLeft) {
    ctx.fillRect(x, height - strokeWidth + y, width - strokeWidth, strokeWidth);
  }

  // Fill left
  if (perimeterPosition > topLeft) {
    ctx.fillRect(x, y, strokeWidth, height - strokeWidth);
  }

  // Draw from the last filled side to our current position
  if (perimeterPosition >= topLeft) {
    // TOP LEFT to TOP MIDDLE
    ctx.fillRect(strokeWidth + x, y, perimeterPosition - topLeft, strokeWidth);
  } else if (perimeterPosition <= topRight) {
    // TOP MIDDLE to TOP RIGHT
    ctx.fillRect((width / 2) + x, y, perimeterPosition, strokeWidth);
  } else if (perimeterPosition <= bottomRight) {
    // TOP RIGHT to BOTTOM RIGHT
    ctx.fillRect(width - strokeWidth + x, strokeWidth + y, strokeWidth, perimeterPosition - topRight);
  } else if (perimeterPosition <= bottomLeft) {
    // BOTTOM RIGHT to BOTTOM LEFT
    ctx.fillRect(width - strokeWidth - (perimeterPosition - bottomRight) + x, height - strokeWidth + y,
      perimeterPosition - bottomRight, strokeWidth);
  } else if (perimeterPosition < topLeft) {
    // BOTTOM LEFT to TOP LEFT
    ctx.fillRect(x, height - strokeWidth - (perimeterPosition - bottomLeft) + y,
      strokeWidth, perimeterPosition - bottomLeft);
  }
};

// Handle representation for hours
var drawHours = function(ctx, hours, color) {
  drawBorder(ctx, 2, hours % 12, 12, color);
};

// Handle representation for minutes
var drawMinutes = function(ctx, minutes, color) {
  drawBorder(ctx, 1, minutes + 1, 60, color);
};

// Handle representation for seconds
var drawSeconds = function(ctx, seconds, color) {
  drawBorder(ctx, 0, seconds + 1, 60, color);
};

module.exports = {
  drawHours: drawHours,
  drawMinutes: drawMinutes,
  drawSeconds: drawSeconds
};

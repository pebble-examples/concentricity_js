// Copyright [2016] Pebble Technology
var rocky = require('rocky');

var round = require('./round');
var rect = require('./rect');

function DrawCommand(platform) {
  if (platform === 'chalk') {
    this.hours = round.drawHours;
    this.minutes = round.drawMinutes;
    this.seconds = round.drawSeconds;
  } else {
    this.hours = rect.drawHours;
    this.minutes = rect.drawMinutes;
    this.seconds = rect.drawSeconds;
  }
  if (platform === 'diorite') {
    this.hourColor = "white";
    this.minuteColor = "white";
    this.secondColor = "white";
  } else {
    this.hourColor = "bluemoon";
    this.minuteColor = "vividviolet";
    this.secondColor = "richbrilliantlavender";
  }
}

var draw = new DrawCommand(rocky.watchInfo.platform);

rocky.on('draw', function(event) {
  var ctx = event.context;
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  var date = new Date();
  draw.hours(ctx, date.getHours(), draw.hourColor);
  draw.minutes(ctx, date.getMinutes(), draw.minuteColor);
  draw.seconds(ctx, date.getSeconds(), draw.secondColor);
});

rocky.on('secondchange', function(event) {
  rocky.requestDraw();
});

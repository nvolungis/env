var events  = require('events');
var Displays = require('./displays.js');
var Controller = require('./controller.js');
var DisplayManager = function(){};

DisplayManager.prototype = new events.EventEmitter();
DisplayManager.prototype.create_manager = function(io){
  var that = this;

  this.display_io = io.of('/display');
  this.displays = new Displays(this.display_io);
  this.controller_io = io.of('/controller');
  this.controller = null;

  this.display_io.on('connection', function(socket) {
    that.create_display(socket);
  });

  this.controller_io.on('connection', function(socket) {
    this.controller = new Controller(socket, that.displays);
  });
};

DisplayManager.prototype.create_display = function(socket) {
  this.displays.add(socket);
};

module.exports = new DisplayManager();

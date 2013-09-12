var _ = require("underscore")._;
var events  = require('events');
var Display = require('./display.js');
var Displays = function(display_io){
  var that = this;
  
  this.list = {}
  this.io = display_io;

  this.add = function(socket){
    var that = this;
    var display = new Display(socket, this);
    this.list[socket.id] = display;
    this.update_indicies();

    display.on('removed', function(id){
      that.remove(id);
    });

    display.on('emit:all:displays', function(data){
      that.emit('emit:all:displays', data);
    });
    
    display.on('emit:controller', function(data){
      console.log('emit controller from display');
      that.emit('emit:controller', data);
    });
  };

  this.on('emit:all:displays', function(data){
    console.log('emit all displays');
    that.io.emit('event:from:server', data);
  });
}; 

Displays.prototype = new events.EventEmitter();

Displays.prototype.remove = function(id) {
  delete this.list[id];
  this.update_indicies();
};

Displays.prototype.update_indicies = function(){
  var index = 0;

  _.each(this.list, function(display){
    display.set_index(index);
    index += 1;
  });

  this.emit('displays:changed', {displays: this.list});
};

module.exports = Displays;

var events  = require('events');

var Display = function(socket, display_manager){
  var that = this;
  
  this.socket = socket;
  this.id = socket.id;

  this.socket.on('disconnect', function() {
    that.emit('removed', this.id);
  });

  this.socket.on('event:from:client', function(data){
    data.from = 'display';
    display_manager.emit('event:from:client', data);;
  }); 
};

Display.prototype = new events.EventEmitter();

Display.prototype.set_index = function(index) {
  this.index = index;
};

Display.prototype.get_index = function(){
  return this.index;
};

Display.prototype.send = function(data){
  this.socket.emit('event:from:server', data);
};

module.exports = Display;

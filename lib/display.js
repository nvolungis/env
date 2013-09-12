var events  = require('events');

var Display = function(socket, list){
  var that = this;
  
  this.socket = socket;
  this.id = socket.id;
  this.socket.send('new display send');
  this.socket.broadcast.send('new display broadcast');

  this.socket.on('disconnect', function() {
    that.remove(that.id);
  });

  this.socket.on('event:from:client', function(data){
    if(data.recip === 'displays') {
      list.emit('emit:all:displays', data);
    } else if(data.recip === 'controller') {
      that.emit('emit:controller', data);
    } else if(data.recip === 'all'){
      that.emit('emit:controller', data);
      list.emit('emit:all:displays', data);
    }
  });

  this.remove = function(socket){
    this.emit('removed', socket);
    this.socket.broadcast.send('remove display broadcast ');
  };
};

Display.prototype = new events.EventEmitter();

Display.prototype.set_index = function(index) {
  this.index = index;
};

Display.prototype.get_index = function(){
  return this.index;
};

module.exports = Display;

var _ = require("underscore")._;
var events  = require('events');
var Manager = function(socket, display_manager){
  var that = this;

  this.socket = socket;

  this.socket.on('disconnect', function() {
    that.remove(socket.id);
  });

  this.socket.on('event:from:client', function(data){
    data.from = 'manager';
    display_manager.emit('event:from:client', data);
  });

  this.remove = function(id){
    that.emit('manager removed');
  };
};

Manager.prototype = new events.EventEmitter();

Manager.prototype.send = function(data){
  this.socket.emit('event:from:server', data);
};

module.exports = Manager;

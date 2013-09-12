var _ = require("underscore")._;
var events  = require('events');
var Controller = function(socket, displays){
  var that = this;

  this.displays = displays;
  this.socket = socket;
  this.socket.send('new controller send');

  this.socket.on('disconnect', function() {
    that.remove(socket.id);
  });

  this.socket.on('event:from:client', function(data){
    if(data.recip === 'controller'){
      that.send(data);
    } else if (data.recip === 'displays') {
      that.displays.emit('emit:all:displays', data);
    } else if (data.recip === 'all') {
      that.send(data);
      that.displays.emit('emit:all:displays', data);
    }
  });

  this.displays.on('displays:changed', function(){
    var displays = [];

    _.each(this.list, function(obj) {
      displays.push({id:obj.id, index:obj.index});
    });

    that.socket.emit('displays:changed', displays);
  });

  this.displays.on('emit:controller', function(data){
    that.send(data);
  });

  this.remove = function(id){
    that.emit('controller removed');
    that.socket.broadcast.send('remove controller broadcast ');
  };

  this.send = function(data){
    that.socket.emit('event:from:server', data);
  };
};

Controller.prototype = new events.EventEmitter();

module.exports = Controller;

var _ = require("underscore")._;
var events  = require('events');
var Display = require('./display.js');
var Displays = function(display_manager, io){
  var that = this;
  
  this.list = {}
  this.io = io;
  this.display_manager = display_manager;

  this.add = function(socket){
    var that = this;
    var display = new Display(socket, display_manager);
    this.list[socket.id] = display;
    this.update_indicies();
    this.display_manager.emit('displays:changed', {displays:this.get_jsonable_list()});

    display.on('removed', function(id){
      that.remove(id);
    });
  };
}; 

Displays.prototype = new events.EventEmitter();

Displays.prototype.remove = function(id) {
  delete this.list[id];
  this.update_indicies();
  this.display_manager.emit('displays:changed', {displays:this.get_jsonable_list()});
};

Displays.prototype.update_indicies = function(){
  var index = 0;

  _.each(this.list, function(display){
    display.set_index(index);
    index += 1;
  });
};

Displays.prototype.get_jsonable_list = function(){
  var list = [];
  _.each(this.list, function(display){
    list.push({socket_id:display.id, index:display.index});
  });

  return list;
};

Displays.prototype.get_displays = function(){
  return this.get_jsonable_list()
};

Displays.prototype.send = function(data){
  this.io.emit('event:from:server', data);
};

module.exports = Displays;

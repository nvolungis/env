var events  = require('events');
var Displays = require('./displays.js');
var Manager = require('./controller.js');
var DisplayManager = function(){};

DisplayManager.prototype = new events.EventEmitter();
DisplayManager.prototype.create_manager = function(io){
  var that = this;

  this.display_io = io.of('/display');
  this.displays = new Displays(this, this.display_io);
  this.manager_io = io.of('/manager');

  this.display_io.on('connection', function(socket) {
    that.displays.add(socket);
  });

  this.manager_io.on('connection', function(socket) {
    that.manager = new Manager(socket, that);
  });

  this.on('event:from:client', function(data){
    console.log('event recieved from', data.from);
    that.notify_clients(data);
  });

  this.on('displays:changed', function(list){
    var data = {
      name: 'displays:changed',
      data: list
    };
    that.notify_manager(data);
    console.log('displays changed', list);
  });
};

DisplayManager.prototype.notify_clients = function(data){
  var queue = this.build_queue(data);

  this.process_queue(queue);
};

DisplayManager.prototype.build_queue = function(data) {
  var queue = [];

  switch(data.recip){
  case 'displays':
    queue.push({notify:'displays', data:data});
    break;

  case 'manager':
    queue.push({notify:'manager', data:data});
    break;

  case 'all':
    queue.push({notify:'displays', data:data});
    queue.push({notify:'manager', data:data});
    break;

  default:
    if(data.recip instanceof Array){
      var i, len = data.recip.length;

      for(i=0; i<len; i++){
        queue.push({notify:'display', id:data.recip[i], data:data});
      }
    }
    break;
  }

  return queue;
};

DisplayManager.prototype.process_queue = function(queue){
  var i, len = queue.length;

  for(i=0; i<len; i++){
    DisplayManager.prototype['notify_'+queue[i].notify].call(this, queue[i].data, queue[i].id);
  }
};

DisplayManager.prototype.notify_display = function(data, id){
  console.log('notify display', id, data);
  this.displays.list[id].send(data);

};

DisplayManager.prototype.notify_displays = function(data){
  console.log('notify display', data);
  this.displays.send(data);
};

DisplayManager.prototype.notify_manager = function(data){
  console.log('notify manager', data);
  if(this.manager) this.manager.send(data);
};

DisplayManager.prototype.get_displays = function(){
  return this.displays.get_displays();
}

module.exports = new DisplayManager();

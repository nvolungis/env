Display.module('WebsocketsApp',function(WebsocketsApp, App, Backbone, Marionette, $, _){
  WebsocketsApp.Events = Marionette.Controller.extend({
    initialize: function(socket){
      this.socket = socket;
      
      socket.on('message', function(data){
        console.log(data);
      });

      socket.on('event:from:server', function(data){
        console.log('event received', data);
      });
    },

    send: function(data) {
      console.log('sending');
      this.socket.emit('event:from:client', data);
    }
  });
});

Display.module('WebsocketsApp',function(WebsocketsApp, App, Backbone, Marionette, $, _){
  WebsocketsApp.Events = Marionette.Controller.extend({
    initialize: function(socket){
      this.socket = socket;
      
      socket.on('message', function(data){
        console.log('message receiced:', data);
      });

      socket.on('event:from:server', function(event){
        App.trigger(event.name, event.data);
        console.log('event received:', event.name);
      });
    },

    send: function(data) {
      console.log('sending event');
      this.socket.emit('event:from:client', data);
    }
  });
});

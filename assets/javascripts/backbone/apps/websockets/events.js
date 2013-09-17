Display.module('WebsocketsApp',function(WebsocketsApp, App, Backbone, Marionette, $, _){
  WebsocketsApp.Events = Marionette.Controller.extend({
    initialize: function(socket){
      this.socket = socket;

      socket.on('message', function(data){
        console.log('message receiced:', data);
      });

      socket.on('event:from:server', function(event){
        App.trigger(event.name, event.data, event.id);
        console.log('event received:', event.name, event);
      });
    },

    send: function(data) {
      console.log('event sent:', data.name, data);
      this.socket.emit('event:from:client', data);
    },

    send_display_attrs: function(data){
      console.log('persist on display');
    }
  });
});

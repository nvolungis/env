Display.module('WebsocketsApp',function(WebsocketsApp, App, Backbone, Marionette, $, _){
  var API = {
    connect: function() {
      new WebsocketsApp.Connection();
    },

    events: function(socket){
      this.event_handler = new WebsocketsApp.Events(socket);
    },

    send_event: function(data){
      if(this.event_handler) this.event_handler.send(data);
    },

    send_display_attrs: function(data){
      if(this.event_handler) this.event_handler.send_display_attrs(data);
    }
  };

  WebsocketsApp.on('start', function(){
    API.connect();
  });

  WebsocketsApp.on('connected', function(socket){
    API.events(socket);
    App.trigger('web:socket:connected', socket);
  });

  App.commands.setHandler('web:socket:send', function(data){
    API.send_event(data);
  });

  App.commands.setHandler('web:socket:send:display:attrs', function(data){
    API.send_display_attrs(data);
  });

});

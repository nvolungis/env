Display.module('WebsocketsApp',function(WebsocketsApp, App, Backbone, Marionette, $, _){
  var API = {
    connect: function() {
      new WebsocketsApp.Connection();
    },

    events: function(socket){
      this.events = new WebsocketsApp.Events(socket);
    },

    send_event: function(data){
      if(this.events) this.events.send(data);
    }
  };

  WebsocketsApp.on('start', function(){
    API.connect();
  });

  WebsocketsApp.on('connected', function(socket){
    API.events(socket);
  });

  App.commands.setHandler('web:socket:send', function(data){
    API.send_event(data);
  });

});

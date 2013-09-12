Display.module('WebsocketsApp',function(WebsocketsApp, App, Backbone, Marionette, $, _){
  WebsocketsApp.Connection = Marionette.Controller.extend({
    initialize: function(){
      var that = this;
      this.interval = setInterval(function(){
        if (window.io !== undefined) that.connect();
     }, 100);
      
    },

    connect: function(){
      clearInterval(this.interval);
      var type = App.request('app:attr', 'type');
      this.socket = io.connect('http://localhost' + '/' + type);
      WebsocketsApp.trigger('connected', this.socket);
    }
  });
});

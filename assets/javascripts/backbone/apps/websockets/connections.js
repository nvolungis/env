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
      console.log('type', type);
      this.socket = io.connect('http://192.168.0.42' + '/' + type);
      WebsocketsApp.trigger('connected', this.socket);
    }
  });
});

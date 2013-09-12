Display.module('HeaderApp', function(HeaderApp, App, Backbone, Marionette, _, $){
  this.startWithParent = false;

  var API = {
    start: function(){
      new HeaderApp.Show.Controller({
        region: App.header_region
      });
    }
  };

  this.on('start', function(){
    API.start();
  });
});

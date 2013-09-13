Display.module('FlashApp.DisplayApp',function(DisplayApp, App, Backbone, Marionette, $, _){
  this.startWithParent = false;
  
  DisplayApp.Router = Marionette.AppRouter.extend({
    appRoutes:{
      '' : 'start'
    }
  });

  var API = {
    start: function(){
      new DisplayApp.Show.Controller();
    }
  };

  App.addInitializer(function(){
    return new DisplayApp.Router({
      controller:API
    });
  });
});


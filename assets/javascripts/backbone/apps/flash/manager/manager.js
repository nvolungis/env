Display.module('FlashApp.ManagerApp', function(ManagerApp, App, Backbone, Marionette, $, _){
  this.startWithParent = false;

  ManagerApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'controller': 'start'
    }
  });

  var API = {
    start: function(){
      new ManagerApp.Show.Controller();
    }
  };

  App.addInitializer(function(){
    return new ManagerApp.Router({
      controller: API
    });
  });
});

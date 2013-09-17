Display.module('FlashApp.ManagerApp', function(ManagerApp, App, Backbone, Marionette, $, _){
  this.startWithParent = false;

  ManagerApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'manager': 'start'
    }
  });

  var API = {
    start: function(){
      this.manager_app = new ManagerApp.Show.Controller();
    },

    flash: function(id){
      this.manager_app.flash(id);
    }
  };

  App.addInitializer(function(){
    return new ManagerApp.Router({
      controller: API
    });
  });

  App.on('display:clicked', function(data, id){
    API.flash(id);
  });

});

Display.module('Entities', function(Entities, App, Backbone, Marionette, $, _){

  Entities.Application = Backbone.Model.extend({});
  
  var API = {
    set: function(obj){
      var app = App.request('cache', 'application', function(){
        return new Entities.Application();
      });

      app.set(obj);
    },

    get: function(key){
      var app = App.request('cache', 'application', function(){
        return new Entities.Application();
      });

      return app.get(key);
    },

    get_all: function(){
     return  App.request('cache', 'application', function(){
        return new Entities.Application();
      });
    }
  };

  App.commands.setHandler('set:app:attr', function(obj){
    API.set(obj);
  });

  App.reqres.setHandler('app:attr', function(key){
    return API.get(key);
  });

  App.reqres.setHandler('app:attrs', function(){
    return API.get_all();
  });
});

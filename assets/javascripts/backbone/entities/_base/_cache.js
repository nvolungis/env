Display.module('Entities',function(Entities, App, Backbone, Marionette, $, _){
  Entities.cache = {};
  
  var API = {
    getCachedObj: function(key, fn, options){
      return Entities.cache[key] ? Entities.cache[key] : (function(){
        return Entities.cache[key] = fn(options);
      }());
    }
  };
  
  
  App.reqres.setHandler('cache', function(key, fn, options){
    return API.getCachedObj(key, fn, options);
  });
});

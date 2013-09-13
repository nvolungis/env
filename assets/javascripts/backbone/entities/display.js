Display.module('Entities.Displays', function(Displays, App, Backbone, Marionette, $, _){
  Displays.Display = Backbone.Model.extend({});

  Displays.Displays = Backbone.Collection.extend({
    model: Displays.Display
  });


  var API = {
    get_displays: function(){
      return App.request('cache', 'displays', function(){
        return new Displays.Displays({});
      });
    },

    set_displays: function(list){
      var displays = this.get_displays();
      displays.set(list);
    }
  };

  App.reqres.setHandler('displays', function(){
    return API.get_displays();
  });
  
  App.commands.setHandler('set:displays', function(list){
    API.set_displays(list);
  });


  App.on('displays:changed', function(data){
    App.execute('set:displays', data.displays);
  });
});
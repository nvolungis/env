Display.module('Entities.Displays', function(Displays, App, Backbone, Marionette, $, _){
  Displays.NullDisplay = Backbone.Model.extend({});

  Displays.Display = Backbone.Model.extend({
    flash: function(){
      var that = this;

      this.set({background: '#cecece'});
      setTimeout(function(){
        that.set({background: '#fff'});
      }, 100);
    },

    update_dims: function(dims){
      var scaled_dims = {
        height:dims.height / 10,
        width:dims.width / 10
      };

      this.set(scaled_dims);
      this.trigger('change:dims');
    }
  });

  Displays.Displays = Backbone.Collection.extend({
    model: Displays.Display,
    url: '/displays',
    flash: function(id){
      var display = this.findWhere({socket_id:id});
      if(display) display.flash();
    },

    get_by_socket_id: function(id){
      return this.findWhere({socket_id:id}) || new Displays.NullDisplay({});
    }
  });

  var API = {
    displays: function(){
      return App.request('cache', 'displays', function(){
        return new Displays.Displays({});
      });
    },

    set_displays: function(list){
      var displays = this.displays();
      displays.set(list);
    },

    fetch_displays: function(){
      var displays = this.displays();
      displays.fetch();

      return displays;
    },

    flash: function(id){
      var displays = this.displays(),
      display = displays.findWhere({socket_id:id});

      display.flash(id);
    },

    set_dims: function(data, id){
      var display = this.displays().get_by_socket_id(id).update_dims(data);;
    }
  };

  App.reqres.setHandler('displays', function(){
    return API.fetch_displays();
  });

  App.commands.setHandler('set:displays', function(list){
    API.set_displays(list);
  });

  App.on('displays:changed', function(data){
    App.execute('set:displays', data.displays);
  });

  App.on('display:dims:changed', function(data, id){
    console.log(data);
    API.set_dims(data, id);
  });

  App.commands.setHandler('display:flash', function(id){
    API.flash(id);
  });

});

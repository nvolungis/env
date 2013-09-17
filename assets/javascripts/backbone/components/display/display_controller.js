Display.module('Attributes', function(Attributes, App, Backbone, Marionette, $, _){

  var API = {
    send_dimensions: function(){
      if(App.request('app:attr', 'type') != 'display') return;

      var  attrs = {height: $(window).height(), width: $(window).width()};
      App.execute('web:socket:send', {
        name: 'display:dims:changed',
        recip: 'manager',
        data: attrs
      });
    }
  };

  App.on('web:socket:connected', function(){
    API.send_dimensions();
  });

  $(window).on('resize', function(){
    _.debouce(API.send_dimensions()); 
  });

});

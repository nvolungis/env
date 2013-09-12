(function(Backbone){
  _.extend(Backbone.Marionette.Application.prototype,{

    navigate: function(route, options){   
      var route = (route.charAt(0) === '/') ? '#' + route : route; 
      Backbone.history.navigate(route, options);
    },

    getCurrentRoute: function(){
      return Backbone.history.fragment;
    }

  });
})(Backbone);

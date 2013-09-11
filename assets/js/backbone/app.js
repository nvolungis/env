(function(){
  this.Display = (function(Backbone, Marionette){
    var App = new Marionette.Application;

    App.root = '';

    App.addRegions({
      header_region: '#header-region',
      main_region: '#main-region',
      panel_region: '#panel-region'
    });

    App.addInitializer(function(){
      App.module('HeaderApp').start();
    });

    App.on('initialize:after',function(){
      if(Backbone.history){
        Backbone.history.start(); //{pushState:true}

        if(this.getCurrentRoute() === '') this.navigate(this.root, {trigger:true});
      }
    });

    return App;

  })(Backbone, Marionette);
}).call(this);//

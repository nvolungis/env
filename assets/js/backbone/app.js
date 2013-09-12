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

    App.reqres.setHandler('default:region', function(){
	   	return App.main_region;
    });
    
    App.commands.setHandler('register:instance', function(instance, id){
	    if (App.environment === 'development') App.register(instance, id);
    });
    
    App.commands.setHandler('unregister:instance', function(instance, id){
	    if (App.environment === 'development') App.unregister(instance, id);
    });

    return App;

  })(Backbone, Marionette);
}).call(this);

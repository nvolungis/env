(function(){
  this.Display = (function(Backbone, Marionette){
    var App = new Marionette.Application;

    App.root = '';

    App.addRegions({
      header_region: '#header-region',
      main_region: '#main-region',
      panel_region: '#panel-region'
    });

    App.on('flash', function(){
      $('body').css({background:'#cccccc'});
      setTimeout(function(){
        $('body').css({background:'#fff'});
      }, 100);
    });

    App.addInitializer(function(){
      App.module('WebsocketsApp').start();
      App.module('Attributes').start();
    });

    App.on('initialize:before', function(options){
      App.execute('set:app:attr', options);
    });

    App.on('initialize:after',function(){
      if(Backbone.history){
        Backbone.history.start({pushState:true});

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

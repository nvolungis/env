Display.moduele('HeaderApp', function(HeaderApp, App, Backbone, Marionette, _, $){
  this.startWithParent = false;

  var API = {
    layoutHeader: function(){
      HeaderApp.Show.Controller.layoutHeader();
    }
  };


  App.on('start', function(){
    API.layoutHeader();
  });
}):




Display.module('HeaderApp.Show', function(Show, App, Backbone, Marionette, _, $){
  Show.Controller = App.Controllers.Base.extend({
    initialize: function(options){
      this.layout = this.getHeading();
      this.show(this.layout);

      this.listenTo(this.layout, 'show', function(){
        console.log('layout shown');
      });
    },

    getHeading: function(){
      return new Show.Heading();
    }
  });
}); 

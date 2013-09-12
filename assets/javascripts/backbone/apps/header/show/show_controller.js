Display.module('HeaderApp.Show', function(Show, App, Backbone, Marionette, _, $){
  Show.Controller = App.Controllers.Base.extend({
    initialize: function(options){
      var app_data = App.request('app:attrs');
      this.heading = this.getHeading(app_data);
      this.show(this.heading);

      this.listenTo(this.heading, 'show', function(){
        console.log('layout shown');
      });
    },

    getHeading: function(app_data){
      return new Show.Heading({
        model: app_data
      });
    }
  });
});

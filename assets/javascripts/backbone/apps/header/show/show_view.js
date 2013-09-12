Display.module('HeaderApp.Show', function(Show, App, Backbone, Marionette, _, $){
  Show.Heading = Marionette.ItemView.extend({
    template: 'header/show/templates/heading'
  });
});

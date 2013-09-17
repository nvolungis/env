Display.module('FlashApp.ManagerApp.Show', function(Show, App, Backbone, Marionette, $, _){
  Show.Layout = Marionette.Layout.extend({
    template: 'flash/manager/show/templates/layout',
    regions: {
      display_region: '#display-region'
    }
  });

  Show.Display = App.Views.Display.extend({});

  Show.Displays = App.Views.Displays.extend({
    itemView: Show.Display
  });
});

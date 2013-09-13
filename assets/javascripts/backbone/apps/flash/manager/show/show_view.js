Display.module('FlashApp.ManagerApp.Show', function(Show, App, Backbone, Marionette, $, _){
  Show.Layout = Marionette.Layout.extend({
    template: 'flash/manager/show/templates/layout',
    regions: {
      display_region: '#display-region'
    }
  });

  Show.Display = Marionette.ItemView.extend({
    template: 'flash/manager/show/templates/display',
    tagName: 'li',
    triggers:{
      'click' : 'clicked'
    }
  });

  Show.Displays = Marionette.CompositeView.extend({
    template: 'flash/manager/show/templates/displays',
    itemView: Show.Display,
    itemViewContainer: '.displays-list',

    collectionEvents: {
      'change': 'render'
    }
  });
});

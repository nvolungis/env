Display.module('FlashApp.DisplayApp.Show',function(Show, App, Backbone, Marionette, $, _){
  Show.Layout = Marionette.Layout.extend({
    template: 'flash/display/show/templates/layout',
    triggers: {
      'click': 'clicked'
    },

    onShow: function(){
      console.log('onshow');
    }
  });
});

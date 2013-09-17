Display.module('Views', function(Views, App, Backbone, Marionette, $, _){
  Views.Displays = Marionette.CompositeView.extend({
    template: 'displays/templates/displays',
    itemViewContainer: '.displays-list',
    collectionEvents: {
      /*
      'add': 'render',
      'remove':'render'
     */
    }
  });

  Views.Display = Marionette.ItemView.extend({
    template: 'displays/templates/display',
    tagName: 'li',

    onShow: function(){
      this.$el.attr({'data-socket-id': this.model.get('socket_id')});
    },

    triggers:{
      'click' : 'clicked'
    },

    modelEvents: {
      'change:background': 'update_bkg',
      'change:dims': 'update_dims'
    },

    update_bkg: function(){
     this.$el.css({background:this.model.get('background')});
    },

    update_dims: function(){
      this.$el.css({width:this.model.get('width'), height: this.model.get('height')})
    }
  });
});

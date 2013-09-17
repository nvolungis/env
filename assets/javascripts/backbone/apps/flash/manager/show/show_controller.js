Display.module('FlashApp.ManagerApp.Show', function(Show, App, Backbone, Marionette, $, _){
  Show.Controller = App.Controllers.Base.extend({
    initialize: function(options){
      var that = this;
      this.display_list = App.request('displays');

      App.execute('when:fetched', [this.display_list], function(){
        that.layout = that.getLayout();

        that.listenTo(that.layout, 'show', function(){
          that.displays();
        });

        that.show(that.layout);
     });
    },

    getLayout: function(){
      return new Show.Layout();
    },

    displays: function(){
      var view = this.getDisplaysView(this.display_list);

      this.listenTo(view,'itemview:clicked', function(args){
        var event = {
          name: 'flash',
          recip: [args.model.get('socket_id')],
          data:null
        };

        App.execute('web:socket:send', event);
      });

      this.layout.display_region.show(view);
    },

    getDisplaysView: function(displays){
      return new Show.Displays({
        collection: displays
      });
    },

    flash: function(id){
      App.execute('display:flash', id);
    }
  });
});

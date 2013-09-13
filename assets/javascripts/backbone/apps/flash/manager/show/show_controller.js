Display.module('FlashApp.ManagerApp.Show', function(Show, App, Backbone, Marionette, $, _){
  Show.Controller = App.Controllers.Base.extend({
    initialize: function(options){
      this.layout = this.getLayout();

      this.listenTo(this.layout, 'show', function(){
        this.displays();
      });

      this.show(this.layout);
    },

    getLayout: function(){
      return new Show.Layout();
    },

    displays: function(){
      var displays = App.request('displays'),
          view = this.getDisplaysView(displays);

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
    }
  });
});

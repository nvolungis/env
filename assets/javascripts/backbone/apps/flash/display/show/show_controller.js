Display.module('FlashApp.DisplayApp.Show',function(Show, App, Backbone, Marionette, $, _){
  Show.Controller = App.Controllers.Base.extend({
    initialize: function(options){
      this.layout = this.getLayout();
      this.listenTo(this.layout, 'clicked', function(e){
        App.execute('web:socket:send', {
          name: 'display:clicked',
          recip: 'manager',
          data:null
        });
      });

      this.show(this.layout);
    },

    getLayout: function(){
      return new Show.Layout();
    }
  });
});

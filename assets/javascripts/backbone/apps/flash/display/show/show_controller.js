Display.module('FlashApp.DisplayApp.Show',function(Show, App, Backbone, Marionette, $, _){
  Show.Controller = App.Controllers.Base.extend({
    initialize: function(options){
      this.layout = this.getLayout();
      this.show(this.layout);
    },

    getLayout: function(){
      return new Show.Layout();
    }
  });
});

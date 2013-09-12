Display.module('Controllers', function(Controllers, App, Backbone, Marionette, $, _){
	Controllers.Base = Marionette.Controller.extend({
		constructor: function(options){
			options = options || {};	
			this.region = options.region || App.request('default:region');
			this._instance_id= _.uniqueId('controller');
			
			App.execute('register:instance', this, this._instance_id);
			Marionette.Controller.prototype.constructor.call(this, options);
		},
		
		close: function(args){
			Marionette.Controller.prototype.close.call(this, args);
			App.execute('unregister:instance', this, this._instance_id);
		},
		
		show: function(view, options){
			options = options || {};
			
			_.defaults(options, {
				loading: false,
				region: this.region
			});

		  this._setMainView(view);
			this._manageView(view, options);
		},
		
		_setMainView: function(view){
			if(this._main_view) return;
			
			this._main_view = view;
			this.listenTo(view, 'close', this.close);
		},
		
		_manageView: function(view, options){
			if(options.loading){
				App.execute('show:loading', view, options);
			}else{
				this.region.show(view);
			}
		} 
	});
});

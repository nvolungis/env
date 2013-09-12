(function($){
  var that = this;

  $.fn.connection_manager = function(options) {
    new ConnectionManager(this, options);
  };

  var ConnectionManager = function(el, options){
    console.log('connection manager');
    this.$el = el;
    this.type = options.type;
    this.connect_button = this.$el.find('#connect');
    this.disconnect_button = this.$el.find('#disconnect');

    this.connect_button.on('click', $.proxy(this.connect, this));
    this.disconnect_button.on('click', $.proxy(this.disconnect, this));
  };

  ConnectionManager.prototype.connect = function() {
    console.log(this);
    this.socket = io.connect('http://localhost/' + this.type);
    this.socket.on('message', this.on_message);
  };

  ConnectionManager.prototype.disconnect = function() {
    console.log('this', this);
    that.socket.disconnect();
  };

  ConnectionManager.prototype.on_message = function(message) {
   console.log(message);
  };
 
}(jQuery));

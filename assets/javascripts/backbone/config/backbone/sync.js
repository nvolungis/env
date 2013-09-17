(function(Backbone){
  var _sync = Backbone.sync;
  
  Backbone.sync = function(method, entity, options){
    options.beforeSend = function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content'); 
      if(token) xhr.setRequestHeader('X-CSRF-Token', token);
    }

    var sync = _sync(method, entity, options);
    
    if(!entity._fetch && method === 'read'){
      entity._fetch = sync;
    }
  };
  
}(Backbone));
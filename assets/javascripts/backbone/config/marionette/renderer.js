Backbone.Marionette.Renderer.render = function(template, data){
  if(template === false) return; 

  var lookups = ["backbone/apps/", "backbone/views/"];

  for(var i in lookups){
    var path = JST[lookups[i] + template]; 

    if(path) return path(data)
  };
}


Backbone.Marionette.Renderer.render = function(template, data){
  var path = JST["backbone/apps/" + template];  
  
  try{
    if(!template) throw({message: "Template '" + template + "' not found!"}); 
    return path(data);
  }
  
  catch(err){
    console.log(template);
    console.log(err.message);
  }
}

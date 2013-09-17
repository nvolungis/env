(function(){ window.JST || (window.JST = {}) 
window.JST["backbone/apps/flash/display/show/templates/layout"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>displaya</h2>\n';
}
return __p;
};

window.JST["backbone/apps/flash/manager/show/templates/layout"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<section id=\'display-region\'></section>\n';
}
return __p;
};

window.JST["backbone/apps/header/show/templates/heading"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>'+
( capitalize(type) )+
'</h2>\n';
}
return __p;
};

window.JST["backbone/views/displays/templates/display"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

window.JST["backbone/views/displays/templates/displays"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>Displays<h2/>\n<ul class=\'displays-list\'></ul>\n';
}
return __p;
};

})();
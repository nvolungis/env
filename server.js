var express         = require('express');
var app             = express();
var server          = require('http').createServer(app);
var io              = require('socket.io').listen(server);
var assets          = require('connect-assets')();
var fs              = require('fs');
var JST             = require('universal-jst');

JST.underscore('./assets/js/', function(err, array_data){
  var file_data = array_data.join('\n');

  fs.writeFile('./assets/js/templates.js', file_data, function(err) {
    if(err) {console.log(err);}
  }); 
});

server.listen(8888);

app.get('/', function (req, res) {
  res.render('index',{ 
    title : 'home' 
  });
});

app.get('/i', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(assets);
app.use(express.static(__dirname + '/public'))

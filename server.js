var express         = require('express');
var app             = express();
var server          = require('http').createServer(app);
var io              = require('socket.io').listen(server);
var assets          = require('connect-assets')();

server.listen(8888);

app.get('/', function (req, res) {
  res.render('index',{ 
    title : 'Home' 
  });
});

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(assets);
app.use(express.static(__dirname + '/public'))

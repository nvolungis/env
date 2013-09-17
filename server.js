var express         = require('express');
var app             = express();
var server          = require('http').createServer(app);
var io              = require('socket.io').listen(server);
var fs              = require('fs');
var JST             = require('universal-jst');
var display_manager = require('./lib/display_manager');
var assets          = require('connect-assets')();
var server_port = 8888;
var server_ip = '192.168.0.42';

server.listen(server_port);
js.root = 'javascripts';
css.root = 'stylesheets';
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(assets);
display_manager.create_manager(io);

//compile my client side templates and place them in my assets dir.
JST.underscore('./assets/javascripts/', function(err, array_data){
  var file_data = array_data.join('\n');

  fs.writeFile('./assets/javascripts/templates.js', file_data, function(err) {
    if(err) {console.log(err);}
  }); 
});

//app routes
app.get('/', function (req, res) {
  res.render('index',{ 
    type:  'display',
    ip:    server_ip
  });
});

app.get('/manager', function (req, res) {
 res.render('index',{ 
    type:  'manager',
    ip:    server_ip
  });
});

app.get('/displays', function(req, res){
  var displays = display_manager.get_displays();
  res.end(JSON.stringify(displays));
});


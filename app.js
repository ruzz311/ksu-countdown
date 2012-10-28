// My SocketStream 0.3 app

var http = require('http'),
    ss = require('socketstream'),
    port = process.env.PORT || 3000;


//============================================================ Define SS clients
  
  // main layout
  ss.client.define('main', {
    view: 'app.html',
    css:  ['libs/reset.css', 'app.styl'],
    code: ['libs/jquery.min.js', 'libs/underscore.js', 'app'],
    tmpl: '*'
  });
  
  // google varification
  ss.client.define('googleVarification', {
    view: 'googlef1c23b1a4fbbe970.html',
    css:  [],
    code: [],
    tmpl: ''
  });


//================================================================== HTTP Router

  // Serve clients on the specified routes
  ss.http.route('/', function(req, res){
    res.serveClient('main');
  });
  
  //google varification
  ss.http.route('/googlef1c23b1a4fbbe970.html', function(req, res){
    res.serveClient('googleVarification');
  });


//====================================================== Server config and start

  // Code Formatters / templates
  ss.client.formatters.add(require('ss-stylus'));
  ss.client.templateEngine.use(require('ss-hogan'));

  // Minimize and pack assets if you type: SS_ENV=production node app.js
  if (ss.env === 'production') ss.client.packAssets();

  // Start web server
  var server = http.Server(ss.http.middleware);
  server.listen(port);

  // Start SocketStream
  ss.start(server);

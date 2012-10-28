var http = require('http');

 
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');
  
  return {
    
    getLogo: function(data){
      console.log("rpc:getLogo", data)
      
      var proxy = http.createClient(80, 'google.com')
      var proxyRequest = proxy.request(req.method, req.url, req.headers);
      
      proxyRequest.on('response', function (proxyResponse) {
        proxyResponse.pipe(res);
      });
      
      req.pipe(proxyRequest);
    }
    
  }
};
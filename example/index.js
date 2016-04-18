var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var createServer = require('./lib/create-server.js');
var impBus = require('./lib/impbus.js');

var BUILD_DIR = path.join(__dirname, '../build');
var ADS_PATH = path.join(__dirname, 'advertiser');


function serveAppNexusLib(request, response) {
  if (request.url === '/js/appnexus-html5-lib.js') {
    response.send(path.join(BUILD_DIR, 'appnexus-html5-lib.js'));
  } else if (request.url === '/js/appnexus-html5-lib-host.js') {
    response.send(path.join(BUILD_DIR, 'appnexus-html5-lib-host.js'));
  } else {
    request.next();
  }
}


// Server for publisher website
createServer(path.join(__dirname, '/publisher/'), 8888, serveAppNexusLib);
// Server for the fake CDN for the ads
createServer(path.join(__dirname, '/advertiser/'), 8889, serveAppNexusLib);
// Server for the IMPBUS to serve the ads
createServer(null, 8887, impBus(ADS_PATH));


console.log("Example server running at http://localhost:8888/\n\nCTRL + C to shutdown");
var path = require("path");
var fs = require("fs");
var querystring = require('querystring');

module.exports = function (adsBasePath) {
  var loadedAds = {};
  var adCount = 0;
  fs.readdir(adsBasePath, function (err, files) {
    for(var i = 0; i < files.length; i++) {
      if (!!~files[i].search(/\.json$/i)) {
        var raw = fs.readFileSync(path.join(adsBasePath, '/', files[i]));
        var ad = JSON.parse(raw);
        ad.name = files[i].substr(0, files[i].lastIndexOf('.')) || files[i];
        loadedAds[ad.id] =  loadedAds[ad.id] || {}
        loadedAds[ad.id] = ad;
        adCount++;      }
    }
    console.info('Loaded ' + adCount + ' ad(s)');
  });


  return function (request, response) {
    var urlParts = request.url.split("?");
    var url = urlParts[0];
    var domain = request.headers.host.split(':')[0];
    var queryParams = querystring.parse(urlParts[1] || '');

    if (url == '/impbus') {
      var adId = parseInt(queryParams.id, 10);
      if (adId && queryParams.size) {
        if (loadedAds[adId]) {
          var ad = loadedAds[adId];
          var adSize = ad.size.split('x');
          var clickTrack = 'http://' + request.headers.host + '/track?id=' + adId + '&r=' + encodeURIComponent(ad['landing-page']);
          response.write(' \
(function () { document.write(\' \
<script type="text/javascript" src="http://' + domain + ':8889/js/appnexus-html5-lib.js"></script> \
<script type="text/javascript">APPNEXUS.placement("' + ad.url + '", "' + clickTrack + '", ' + adSize[0] + ', ' + adSize[1] + ');</script> \
\'); \
})(); \
          ');
          response.end();
        } else {
          response.write("The ad with ID " + queryParams.id + " was not found\n");
          response.end();
        }
      } else {
        response.write("Please specify an ad ID as a query parameter to render the ad\n");
        response.end();
      }
    } else if (url == '/track') {
      var adId = parseInt(queryParams.id, 10);
      var ad = loadedAds[adId];
      console.log("User has clicked ad ID: ", queryParams.id, " (", ad.name, ")");
      response.writeHead(302, {'Location': queryParams.r });
      response.end();
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
    }
  }
}
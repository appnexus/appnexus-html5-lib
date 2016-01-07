var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

module.exports = function createServer(servePath, port, processFunction) {

  http.createServer(function(request, response) {

    response.send = function (filename) {
      fs.exists(filename, function(exists) {
        if(!exists) {
          response.writeHead(404, {"Content-Type": "text/plain"});
          response.write("404 Not Found\n");
          response.end();
          return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
          if(err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            return;
          }

          response.writeHead(200);
          response.write(file, "binary");
          response.end();
        });
      });
    }

    request.next = function () {
      if (!response.finished && servePath !== null) {
        var uri = url.parse(request.url).pathname
        var filename = path.join(servePath, uri );
        response.send(filename);
      }
    }

    if (typeof(processFunction) === 'function') {
      return processFunction.apply(this, [request, response]);
    } else {
      request.next();
    }
  }).listen(port);
}
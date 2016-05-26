var jsdom = require('jsdom');

jsdom.createPage = function  (url, html, scriptSources, callback) {
  if (typeof scriptSources === 'function' && callback === undefined) {
    callback = scriptSources
    scriptSources = undefined;
  }
  jsdom.env({
    url: url,
    html: html,
    virtualConsole: jsdom.createVirtualConsole().sendTo(console),
    src: scriptSources,
    done: function (err, window) {
      if (err) throw err;
      window.open = function () { };
      callback(window);
    }
  });
}

jsdom.injectScript = function (document, scriptSource, callback) {
  var script = document.createElement('script');
  script.onload = function () {
    callback();
  }
  script.text = scriptSource;
  document.body.appendChild(script);
}

module.exports = jsdom;

var utils = {
  sprintf: function (format) {
    var args = arguments;
    var index = 0;
    return format.replace(/%s/g, function (dummy, match) {
      return args[++index];
    });
  },
  //http://youmightnotneedjquery.com/#deep_extend
  deepExtend: function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            out[key] = utils.deepExtend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }

    return out;
  }
}

module.exports = utils;
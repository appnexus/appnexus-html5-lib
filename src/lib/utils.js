module.exports = {
  sprintf: function (format) {
    var args = arguments;
    var index = 0;
    return format.replace(/%s/g, function (dummy, match) {
      return args[++index];
    });
  }
}
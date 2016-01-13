function EventListener() {
  this.__listeners__ = [];
}

EventListener.prototype.addEventListener = function (name, callback) {
  this.__listeners__.push({callback: callback, name: name});
}

EventListener.prototype.removeEventListener = function (name, callback) {
  for (var i = this.__listeners__.length - 1; i >= 0; i--) {
    if (this.__listeners__[i].name === name && this.__listeners__[i].callback === callback) {
      this.__listeners__.splice(i, 1);
    }
  }
}

EventListener.prototype.dispatchEvent = function (name) {
  for (var i = this.__listeners__.length - 1; i >= 0; i--) {
    if (this.__listeners__[(this.__listeners__.length - i - 1)].name === name) {
      this.__listeners__[(this.__listeners__.length - i - 1)].callback();
    }
  }
}

module.exports = EventListener;
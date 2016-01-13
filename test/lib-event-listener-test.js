var expect = require('chai').expect;
var EventListener = require('../src/lib/event-listener');

describe('EventListener', function () {
  var el;

  beforeEach(function () {
    el = new EventListener();
  })

  it('creates an EventListener type object', function () {
      expect(el).to.be.an.instanceOf(EventListener);
  });

  it('can add event listenings', function () {
    el.addEventListener('click', function () {});
    el.addEventListener('click2', function () {});

    expect(el.__listeners__.length).to.be.equal(2);
    expect(el.__listeners__[0].name).to.be.equal('click');
  });

  it('can remove event listenings', function () {
    var callback = function(){};
    el.addEventListener('click', callback);
    el.addEventListener('click2', function () {});
    el.removeEventListener('click', callback);

    expect(el.__listeners__.length).to.be.equal(1);
    expect(el.__listeners__[0].name).to.be.equal('click2');
  });

  it('can dispatch events', function (done) {
    el.addEventListener('click', function () {
      done();
    });
    el.dispatchEvent('click');
  });
});

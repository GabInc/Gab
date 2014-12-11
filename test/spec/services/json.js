'use strict';

describe('Service: json', function () {

  // load the service's module
  beforeEach(module('sqrApp'));

  // instantiate service
  var json;
  beforeEach(inject(function (_json_) {
    json = _json_;
  }));

  it('should do something', function () {
    expect(!!json).toBe(true);
  });

});

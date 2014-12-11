'use strict';

describe('Directive: action', function () {

  // load the directive's module
  beforeEach(module('gabApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<action></action>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the action directive');
  }));
});

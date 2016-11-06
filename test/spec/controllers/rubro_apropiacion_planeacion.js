'use strict';

describe('Controller: RubroApropiacionPlaneacionCtrl', function () {

  // load the controller's module
  beforeEach(module('nixClienteYeoApp'));

  var RubroApropiacionPlaneacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroApropiacionPlaneacionCtrl = $controller('RubroApropiacionPlaneacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroApropiacionPlaneacionCtrl.awesomeThings.length).toBe(3);
  });
});

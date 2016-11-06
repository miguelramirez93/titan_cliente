'use strict';

describe('Controller: RubroApropiacionAprobacionCtrl', function () {

  // load the controller's module
  beforeEach(module('nixClienteYeoApp'));

  var RubroApropiacionAprobacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroApropiacionAprobacionCtrl = $controller('RubroApropiacionAprobacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroApropiacionAprobacionCtrl.awesomeThings.length).toBe(3);
  });
});

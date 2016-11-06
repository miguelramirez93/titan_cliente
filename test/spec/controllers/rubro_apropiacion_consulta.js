'use strict';

describe('Controller: RubroApropiacionConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('nixClienteYeoApp'));

  var RubroApropiacionConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroApropiacionConsultaCtrl = $controller('RubroApropiacionConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroApropiacionConsultaCtrl.awesomeThings.length).toBe(3);
  });
});

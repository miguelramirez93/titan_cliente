'use strict';

describe('Controller: RubroConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('nixClienteYeoApp'));

  var RubroConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RubroConsultaCtrl = $controller('RubroConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RubroConsultaCtrl.awesomeThings.length).toBe(3);
  });
});

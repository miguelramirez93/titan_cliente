'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:RubroConsultaCtrl
 * @description
 * # RubroConsultaCtrl
 * Controller of the nixClienteYeoApp
 */
angular.module('nixClienteYeoApp')
  .controller('RubroConsultaCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message = 'Consulta de rubros Vigencia';
    $scope.gridOptions = {
      enableFiltering : false,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: true,
      rowEditWaitInterval :-1,
      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Entidad.Nombre', width: '10%',  displayName: 'Entidad'},
        {field: 'Vigencia',       width: '10%',  cellClass:'alignleft'},
        {field: 'Codigo',         width: '20%'},
        {field: 'Descripcion',    width: '30%'},
        {field: 'TipoPlan',      width: '10%'},
        {field: 'Administracion', width: '10%',},
        {field: 'Estado',         width: '10%'}
      ]

    };
    $http.get('http://10.20.2.105:8080/v1/rubro').then(function(response) {
      $scope.gridOptions.data = response.data;
    });
    $scope.actualiza_rubros = function () {
      $http.get('http://10.20.2.105:8080/v1/rubro/?limit=0&query=vigencia%3A' + $scope.selectVigencia).success(function (data) {
        $scope.gridOptions.data = data;
        });
      };

  });

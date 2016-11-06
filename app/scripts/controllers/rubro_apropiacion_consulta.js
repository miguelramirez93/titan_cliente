'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:RubroApropiacionConsultaCtrl
 * @description
 * # RubroApropiacionConsultaCtrl
 * Controller of the nixClienteYeoApp
 */
angular.module('nixClienteYeoApp')
  .controller('RubroApropiacionConsultaCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message = 'Apropiacion de la vigencia';
    $scope.gridOptions = {
      enableFiltering : false,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: true,
      rowEditWaitInterval :-1,
      columnDefs : [
        {field: 'Id',               visible : false},
        {field: 'Rubro.Codigo',     width: '18%', enableSorting : false,     cellClass:'alignleft',  displayName: 'Código'},
        {field: 'Vigencia',         width: '7%'},
        {field: 'Rubro.Descripcion',width: '44%', resizable : true,           displayName: 'Descripción'},
        {field: 'Estado.Nombre',    width: '16%',  displayName: 'Estado',  enableCellEdit: false},
        {field: 'Valor',            width: '15%', cellFilter: 'currency'}
      ]

    };
    $http.get('http://10.20.2.105:8080/v1/apropiacion').then(function(response) {
      $scope.gridOptions.data = response.data;
    });

    $scope.actualiza_rubros = function () {
      $http.get('http://10.20.2.105:8080/v1/apropiacion/?limit=0&query=vigencia%3A' + $scope.selectVigencia).success(function(data) {
        $scope.gridOptions.data = data;
        });
      };

  });

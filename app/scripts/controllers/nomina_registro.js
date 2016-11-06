'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:RubroConsultaCtrl
 * @description
 * # RubroConsultaCtrl
 * Controller of the nixClienteYeoApp
 */
var app = angular.module('titanClienteYeoApp')
  app.factory("nomina",function(){
        return {};
  })
  .controller('NominaRegistroCtrl', function ($scope,CONFIG,$window,nomina,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message = 'Registro de Nominas';
    $scope.formVisibility = false;

    $scope.ShowForm = function(){
      $scope.formVisibility = true;

    };
    
    $scope.gridOptions = {

      enableFiltering : false,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Nombre', width: '10%',  displayName: 'Nombre' },
        {field: 'Descripcion',         width: '30%'},
        {field: 'Vinculacion',    width: '10%'},
        {field: 'TipoNomina',      width: '30%'},
        {field: 'Estado',         width: '10%'},
        {field: 'Periodo',         width: '10%'},
        {field: 'Opciones',         width: '30%', cellTemplate: '<button class="btn" ng-click="grid.appScope.consulta_preliquidacion(row)">preliquidaciones</button>'}
      ]

    };
     $http.get(CONFIG.APIURLCRUD+'nomina?limit=0&sortby=Id&order=desc').then(function(response) {
      $scope.gridOptions.data = response.data;
     });

     $scope.limpiar = function() {
        $scope.formVisibility = false;
     };


     $scope.registrar_nomina = function() {
        var nomina = {
              Nombre: $scope.nombreNomina,
              Descripcion: $scope.descripcionNomina,
              Vinculacion: parseInt($scope.selectVinculacion),
              TipoNomina: $scope.selectTipoNomina,
              Estado: $scope.selectEstado,
              Periodo: $scope.periodoNomina
          };
     
      
            $http.post(CONFIG.APIURLCRUD+'nomina', nomina).success(function(data) {
              console.log(data);
              if(typeof(data)=="object"){
                alert("Nomina "+data.Nombre+" registrada correctamente");
                $http.get(CONFIG.APIURLCRUD+'nomina?limit=0&sortby=Id&order=desc').then(function(response) {
                  $scope.gridOptions.data = response.data;
                });
              }
              if(typeof(data)=="string"){
                alert("error: "+data);
              }
            });;
        
        $scope.formVisibility = false;
     };
    

      $scope.consulta_preliquidacion = function(row){
        $scope.nomina = nomina;
        $scope.nomina.Id = row.entity.Id;
        $scope.nomina.Vinculacion = row.entity.Vinculacion;
        $window.location.href = '#/preliquidacion_registro';

      };

//consulta_preliquidacion(row)
        
  });
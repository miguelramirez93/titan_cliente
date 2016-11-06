'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:RubroConsultaCtrl
 * @description
 * # RubroConsultaCtrl
 * Controller of the nixClienteYeoApp
 */
angular.module('titanClienteYeoApp')
  .controller('PreliquidacionRegistroCtrl', function ($scope,CONFIG,nomina,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message = 'Registro de Preliquidaciones';
    $scope.formVisibility = false;
    $scope.loading = false;
    $scope.nomina = nomina;
    $scope.CurrentDate = new Date();

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
        {field: 'Nombre', width: '20%',  displayName: 'Nombre' },
        {field: 'Descripcion',         width: '30%'},
        {field: 'Fecha',    width: '15%', displayName: 'F registro' },
        {field: 'FechaInicio',    width: '15%'},
        {field: 'FechaFin',      width: '15%'},
        {field: 'Estado',         width: '10%'},
        {field: 'Opciones',         width: '10%', cellTemplate: '<button class="btn" ng-click="grid.appScope.generar_preliquidacion(row)">Generar</button>'}
      ]

    };
     $http.get(CONFIG.APIURLCRUD+'preliquidacion?limit=0&query=Nomina.Id:'+$scope.nomina.Id+'&sortby=Id&order=desc').then(function(response) {
      $scope.gridOptions.data = response.data;
     });

     $scope.limpiar = function() {
        $scope.formVisibility = false;
     };


     $scope.registrar_preliqu = function() {
      var nomina = { 
        Id : parseInt($scope.nomina.Id)
      };
        var pliquidacion = {
              Nombre: $scope.nombrePreliquidacion,
              Descripcion: $scope.descripcionPreliquidacion,
              Nomina: nomina,
              IdUsuario: 1,
              Estado: $scope.selectEstado,
              Fecha: $scope.CurrentDate,
              FechaInicio:  $scope.FechaInicio,
              FechaFin: $scope.FechaFin
          };
     
      
            $http.post(CONFIG.APIURLCRUD+'preliquidacion', pliquidacion).success(function(data) {
              console.log(data);
              if(typeof(data)=="object"){
                alert("Preliquidacion "+data.Nombre+" registrada correctamente");
                $http.get(CONFIG.APIURLCRUD+'preliquidacion?limit=0&query=Nomina.Id:'+$scope.nomina.Id+'&sortby=Id&order=desc').then(function(response) {
                  $scope.gridOptions.data = response.data;
                 });
              }
              if(typeof(data)=="string"){
                alert("error: "+data);
              }
            });;
        
        $scope.formVisibility = false;
     };
    
     $scope.generar_preliquidacion = function(row){
        $scope.loading = true;
        $http.get(CONFIG.APIURLMID+'preliquidacion/Generar?tnomina='+$scope.nomina.Vinculacion+'&tdominio=1&preliquidacion='+row.entity.Id).then(function(response) {
                  $scope.loading = false;
                  alert(response.data);
                 });
     };
        
  });     

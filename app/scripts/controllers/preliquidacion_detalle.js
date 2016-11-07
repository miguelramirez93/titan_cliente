'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:RubroConsultaCtrl
 * @description
 * # RubroConsultaCtrl
 * Controller of the nixClienteYeoApp
 */
angular.module('titanClienteYeoApp')
  .controller('PreliquidacionDetalleCtrl', function ($scope,CONFIG,preliquidacion,$window,uiGridConstants,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message = 'Detalle de Preliquidaciones';
    $scope.preliquidacion = preliquidacion;
    $scope.CurrentDate = new Date();
     $scope.mensaje = "";
   
    $scope.gridOptions = {

      enableFiltering : true,
      enableSorting : true,
      showGridFooter: true,
      showColumnFooter: true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      enableRowSelection: true,
      enableSelectAll: true,
      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Nombre_Cont', width: '30%',  displayName: 'Nombre' },
        {field: 'NumDocumento', width: '15%' ,  displayName: 'CC'},
        {field: 'Valor_bruto',    width: '15%' , displayName: 'V bruto',cellFilter: 'currency'},
        {field: 'Valor_neto',    width: '15%',  displayName: 'V neto',aggregationType: uiGridConstants.aggregationTypes.sum,cellFilter: 'currency'},
        {
            field: 'Novedades', width: '15%' ,displayName: 'Novedades', 
            cellTemplate: '<button class="btn" ng-click="grid.appScope.ver_novedades_aplicadas(row)" data-toggle="modal" data-target="#myModal">ver</button>'
        }
      ],
      onRegisterApi: function(gridApi) { $scope.gridApi = gridApi; } 
    };

    $scope.gridOptions_novedades = {

      enableFiltering : true,
      showColumnFooter: true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      columnDefs : [
        {field: 'Id', width: '30%',   visible : false },
        {field: 'DetalleNovedad.Novedad.Nombre', width: '15%' ,  displayName: 'Nombre'},
        {field: 'DetalleNovedad.Novedad.Descripcion',    width: '30%' , displayName: 'Descripcion'},
        {field: 'DetalleNovedad.Novedad.IdProveedor.NomProveedor',    width: '15%',  displayName: 'Proveedor'},
        {field: 'DetalleNovedad.Novedad.Naturaleza',    width: '30%' , displayName: 'Naturaleza'},
        {field: 'DetalleNovedad.Novedad.Valor',    width: '30%' , displayName: 'Valor'}
      ]
    };


     $scope.gridOptions.multiSelect = true;
     $scope.loading = true;
     $http.get(CONFIG.APIURLMID+'detalle_preliquidacion/informe?id='+$scope.preliquidacion.Id).then(function(response) {
      $scope.loading = false;
      $scope.gridOptions.data = response.data;
      for(var i=0; i<$scope.gridOptions.data[0].Descuentos.length; i++){
        $scope.gridOptions.columnDefs.push({
            field: 'Descuentos.'+i+'.Base', width: '15%' ,displayName: 'Base '+ $scope.gridOptions.data[0].Descuentos[i].Nombre,cellFilter: 'currency'
        });
        $scope.gridOptions.columnDefs.push({
            field: 'Descuentos.'+i+'.Valor', width: '15%' ,displayName: 'Valor por '+ $scope.gridOptions.data[0].Descuentos[i].Nombre,cellFilter: 'currency'
        });

    } 

     /* $scope.gridOptions.columnDefs.push({
            field: 'Novedades', width: '15%' ,displayName: 'Novedades', 
            cellTemplate: '<button class="btn" ng-click="grid.appScope.ver_novedades_aplicadas(row)" data-toggle="modal" data-target="#myModal">ver</button>'
        });*/
      $scope.gridOptions.data = response.data;
      $scope.gridApi.core.refresh();

     });

     
     $scope.ver_novedades_aplicadas = function(row){
       $http.get(CONFIG.APIURLCRUD+'novedad_aplicada?query=DetallePreliquidacion.Id:'+row.entity.Id).then(function(response) {
          if(response.data === null){
            $scope.mensaje = "Sin Novedades Aplicadas para esta Nomina.";
          }else{
            $scope.gridOptions_novedades.data = response.data; 
          }
            
       });
     };

     
        
  });     
     

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
        {field: 'Nombre_Cont', width: '30%',  displayName: 'Nombre' },
        {field: 'NumDocumento', width: '15%' ,  displayName: 'CC'},
        {field: 'Valor_bruto',    width: '15%' , displayName: 'V bruto',cellFilter: 'currency'},
        {field: 'Valor_neto',    width: '15%',  displayName: 'V neto',aggregationType: uiGridConstants.aggregationTypes.sum,cellFilter: 'currency'},
      ]
//| date:'yyyy-MM-dd' Descuentos 
/*
   for(var i=0; i<$scope.gridOptions.data[0].Descuentos.length; i++){
        $scope.gridOptions.columnDefs.push({
            field: 'Descuentos.'+i+'.Base', displayName: 'Base'+ 'Descuentos.'+i+'.Nombre'
        });
    }
*/
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
     });

     


     
        
  });     
     

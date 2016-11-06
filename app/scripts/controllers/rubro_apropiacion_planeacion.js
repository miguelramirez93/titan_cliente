'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:RubroApropiacionPlaneacionCtrl
 * @description
 * # RubroApropiacionPlaneacionCtrl
 * Controller of the nixClienteYeoApp
 */
angular.module('nixClienteYeoApp')
  .controller('RubroApropiacionPlaneacionCtrl', function ($scope, $http, uiGridConstants, uiGridTreeViewConstants) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message = 'Planeación de presupuesto para una vigencia';
    // $scope.celdas_editadas = gridApi.rowEdit.getDirtyRows();
    $scope.gridOptions_ingresos = {
      enableFiltering : false,
      enableSorting : false,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      rowEditWaitInterval :-1,
      showGridFooter:true,
      columnDefs : [
        {field: 'Id',               enableCellEdit: false,  visible : false},
        {field: 'Rubro.Codigo',     enableCellEdit: false,  width: '18%',
         enableSorting : false,     cellClass:'alignleft',  displayName: 'Código'},
        {field: 'Vigencia',         enableCellEdit: false,  width: '7%'},
        {field: 'Rubro.Descripcion',enableCellEdit: false,  width: '44%',
        resizable : true,           displayName: 'Descripción'},
        {field: 'Estado.Nombre',    displayName: 'Estado',  enableCellEdit: false,  width: '7%'},
        {field: 'Valor',            enableCellEdit: true,   width: '15%',
         type:'number',             cellFilter: 'currency',
         cellEditableCondition: function($scope){
           if($scope.row.entity.Estado.Nombre == 'Aprobado'){
             return false;
           } else {
             return true;
           }
         }
        }
      ]
    };

    $scope.gridOptions_gastos = {
      enableFiltering : false,
      enableSorting : false,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      rowEditWaitInterval :-1,
      showGridFooter:true,
      columnDefs : [
        {field: 'Id',               enableCellEdit: false,  visible : false},
        {field: 'Rubro.Codigo',     enableCellEdit: false,  width: '18%',
         enableSorting : false,     cellClass:'alignleft',  displayName: 'Código'},
        {field: 'Vigencia',         enableCellEdit: false,  width: '7%'},
        {field: 'Rubro.Descripcion',enableCellEdit: false,  width: '44%',
        resizable : true,           displayName: 'Descripción'},
        {field: 'Estado.Nombre',    displayName: 'Estado',  enableCellEdit: false,  width: '7%'},
        {field: 'Valor',            enableCellEdit: true,   width: '15%',
         type:'number',             cellFilter: 'currency',
         cellEditableCondition: function($scope){
           if($scope.row.entity.Estado.Nombre == 'Aprobado'){
             return false;
           } else {
             return true;
           }
         }
       }
      ]
    };


    $scope.gridOptions_ingresos.onRegisterApi = function(gridApi) {
    //set gridApi on scope
      $scope.gridApi_ingresos = gridApi;
      gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
        $scope.verificar_sumas(gridApi.grid.rows.reverse());
        gridApi.grid.rows.reverse();
        // console.log('$scope.valor_sumas');
        // console.log($scope.valor_sumas);
        // console.log('$scope.stack_sumas');
        // console.log($scope.stack_sumas);

        colDef.cellClass = function(grid, row, col, rowRenderIndex, colRenderIndex) {

          if($scope.valor_sumas.hasOwnProperty(row.entity.Rubro.Codigo)){
            if ($scope.valor_sumas[row.entity.Rubro.Codigo] !== row.entity.Valor) {
              return "color_red";
            };
          };
          return "";
        };

        $scope.gridApi_ingresos.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };

    $scope.gridOptions_gastos.onRegisterApi = function(gridApi) {
    //set gridApi on scope
      $scope.gridApi_gastos = gridApi;
      gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
        $scope.verificar_sumas(gridApi.grid.rows.reverse());
        gridApi.grid.rows.reverse();
        // console.log('$scope.valor_sumas');
        // console.log($scope.valor_sumas);
        // console.log('$scope.stack_sumas');
        // console.log($scope.stack_sumas);

        colDef.cellClass = function(grid, row, col, rowRenderIndex, colRenderIndex) {

          if($scope.valor_sumas.hasOwnProperty(row.entity.Rubro.Codigo)){
            if ($scope.valor_sumas[row.entity.Rubro.Codigo] !== row.entity.Valor) {
              return "color_red";
            };
          };
          return "";
        };

        $scope.gridApi_gastos.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };

    $scope.verificar_sumas = function(filas){
      // console.log(filas);
      $scope.stack_sumas = [];
      $scope.valor_sumas = {};
      var campo_valor = "";
      for(var i=0; i<filas.length; i++){
        campo_valor = (filas[i].entity.Rubro.Codigo).split(/[-]*[0-9]+$/)[0];
        if($scope.stack_sumas.length !== 0){
          if(campo_valor === $scope.stack_sumas[$scope.stack_sumas.length-1].campo){
            $scope.stack_sumas[$scope.stack_sumas.length-1].valor =
              $scope.stack_sumas[$scope.stack_sumas.length-1].valor + Number(filas[i].entity.Valor);
              // console.log(filas[i].entity);
          }else if(filas[i].entity.Rubro.Codigo === $scope.stack_sumas[$scope.stack_sumas.length-1].campo){
            $scope.valor_sumas[filas[i].entity.Rubro.Codigo] = ($scope.stack_sumas.pop()).valor;

            if($scope.stack_sumas.length > 0 && $scope.stack_sumas[$scope.stack_sumas.length-1].campo === campo_valor){
              $scope.stack_sumas[$scope.stack_sumas.length-1].valor =
                $scope.stack_sumas[$scope.stack_sumas.length-1].valor + $scope.valor_sumas[filas[i].entity.Rubro.Codigo];
            }else{
              $scope.stack_sumas.push({
                campo:  campo_valor,
                valor:  $scope.valor_sumas[filas[i].entity.Rubro.Codigo]
              });
            }
            // console.log('copio'+$scope.stack_sumas[$scope.stack_sumas.length-1]);
          }else{
            $scope.stack_sumas.push({
              campo:  campo_valor,
              valor:  Number(filas[i].entity.Valor)
            });
          }
        }else{
          $scope.stack_sumas.push({
            campo:  campo_valor,
            valor:  Number(filas[i].entity.Valor)
          });
        };

      }

    };

    $scope.guardar_celdas_editadas = function(gridApi){
      var filas_por_guardar = gridApi.rowEdit.getDirtyRows();
      for (var i = 0; i < filas_por_guardar.length; i++) {
        $http.put('http://10.20.2.105:8080/v1/apropiacion/'+filas_por_guardar[i].entity.Id+'',filas_por_guardar[i].entity);
      }
      var dataRows = filas_por_guardar.map( function( gridRow ) { return gridRow.entity; });
      gridApi.rowEdit.setRowsClean(dataRows);
    };

    $http.get('http://10.20.2.105:8080/v1/apropiacion?limit=0&query=vigencia%3A2016').then(function(response) {
      $scope.gridOptions_ingresos.data = response.data.sort(function(a,b){
        if(a.Rubro.Codigo < b.Rubro.Codigo) return -1;
        if(a.Rubro.Codigo > b.Rubro.Codigo) return 1;
        return 0;});
      var max_level = 0;
      var level = 0;
      for (var i=0; i < $scope.gridOptions_ingresos.data.length; i++){
        level = ($scope.gridOptions_ingresos.data[i].Rubro.Codigo.match(/-/g) || []).length;
          if (level > max_level){
            max_level = level;
          };
      };

      for (var i=0; i < $scope.gridOptions_ingresos.data.length; i++){
        level = ($scope.gridOptions_ingresos.data[i].Rubro.Codigo.match(/-/g) || []).length;
        //console.log(level);
        if(level < max_level){
            $scope.gridOptions_ingresos.data[i].$$treeLevel = level;
        };
      };

    });

    $http.get('http://10.20.2.105:8080/v1/apropiacion?limit=0&query=vigencia%3A2016').then(function(response) {
      $scope.gridOptions_gastos.data = response.data.sort(function(a,b){
        if(a.Rubro.Codigo < b.Rubro.Codigo) return -1;
        if(a.Rubro.Codigo > b.Rubro.Codigo) return 1;
        return 0;});
      var max_level = 0;
      var level = 0;
      for (var i=0; i < $scope.gridOptions_gastos.data.length; i++){
        level = ($scope.gridOptions_gastos.data[i].Rubro.Codigo.match(/-/g) || []).length;
          if (level > max_level){
            max_level = level;
          };
      };

      for (var i=0; i < $scope.gridOptions_gastos.data.length; i++){
        level = ($scope.gridOptions_gastos.data[i].Rubro.Codigo.match(/-/g) || []).length;
        //console.log(level);
        if(level < max_level){
            $scope.gridOptions_gastos.data[i].$$treeLevel = level;
        };
      };

    });



  });

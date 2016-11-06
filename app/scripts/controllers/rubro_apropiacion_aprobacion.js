'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:RubroApropiacionAprobacionCtrl
 * @description
 * # RubroApropiacionAprobacionCtrl
 * Controller of the nixClienteYeoApp
 */
angular.module('nixClienteYeoApp')
  .controller('RubroApropiacionAprobacionCtrl', function ($scope, $http, uiGridTreeViewConstants) {
    $scope.message = 'Aprobación de presupuesto para una vigencia';

    $scope.gridOptions = {
      enableFiltering : false,
      enableSorting : false,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      enableRowSelection: true,
      enableSelectAll: true,
      selectionRowHeaderWidth: 35,
      rowHeight: 24,
      showGridFooter:true,
      columnDefs : [
        {field: 'Id',               visible : false},
        {field: 'Rubro.Codigo',     width: '18%',
         enableSorting : false,     cellClass:'alignleft',  displayName: 'Código'},
        {field: 'Vigencia',         width: '7%'},
        {field: 'Rubro.Descripcion',width: '40%',
        resizable : true,           displayName: 'Descripción'},
        {field: 'Estado.Nombre',    displayName: 'Estado',  width: '7%'},
        {field: 'Valor',            width: '15%',
         type:'number',             cellFilter: 'currency'}
      ],
      isRowSelectable : function(row){
        if(row.entity.Estado.Nombre == 'Aprobado'){
          return false;
        } else {
          return true;
        }
      },
      onRegisterApi : function( gridApi ) {
        $scope.gridApi = gridApi;
      }
    };

    $scope.aprobar_celdas_editadas = function(){
      console.log($scope.gridApi.selection.getSelectedRows());
    };

    $http.get('http://10.20.2.105:8080/v1/apropiacion?limit=0&query=vigencia%3A2016').then(function(response) {
      $scope.gridOptions.data = response.data.sort(function(a,b){
        if(a.Rubro.Codigo < b.Rubro.Codigo) return -1;
        if(a.Rubro.Codigo > b.Rubro.Codigo) return 1;
        return 0;});
      var max_level = 0;
      var level = 0;
      for (var i=0; i < $scope.gridOptions.data.length; i++){
        level = ($scope.gridOptions.data[i].Rubro.Codigo.match(/-/g) || []).length;
          if (level > max_level){
            max_level = level;
          };
      };

      for (var i=0; i < $scope.gridOptions.data.length; i++){
        level = ($scope.gridOptions.data[i].Rubro.Codigo.match(/-/g) || []).length;
        //console.log(level);
        if(level < max_level){
            $scope.gridOptions.data[i].$$treeLevel = level;
        };
      };

    });



  });

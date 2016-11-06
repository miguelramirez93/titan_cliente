'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:RubroConsultaCtrl
 * @description
 * # RubroConsultaCtrl
 * Controller of the nixClienteYeoApp
 */
angular.module('nixClienteYeoApp')
  .controller('RubroRegistroCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.message = 'Registro de rubros';
    
    $scope.codigo_padre = 'Sin Rubro Padre';
    $scope.gridOptions = {

      enableFiltering : false,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Entidad.Nombre', width: '10%',  displayName: 'Entidad' },
        {field: 'Vigencia',       width: '10%',  cellClass:'alignleft'},
        {field: 'Codigo',         width: '20%',  cellTemplate: '<div ng-click="grid.appScope.agregar_padre(row)">{{row.entity.Codigo}} </div>', 
          cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
            if (grid.getCellValue(row ,col).toLowerCase() === $scope.ultimo_registro) {
            return 'color_green';
            }
          } 
        },
        {field: 'Descripcion',    width: '30%'},
        {field: 'TipoPlan',      width: '10%'},
        {field: 'Administracion', width: '10%'},
        {field: 'Estado',         width: '10%'}
      ]

    };
    
     
    $http.get('http://localhost:8082/v1/entidad/?limit=0').success(function (data) {
      $scope.entidadOptions = data;
      });
    $http.get('http://localhost:8082/v1/rubro').then(function(response) {
      $scope.gridOptions.data = response.data.sort(function(a,b){
        if(a.Codigo < b.Codigo) return -1;
        if(a.Codigo > b.Codigo) return 1;
        return 0;});
      var max_level = 0;
      var level = 0;
      for (var i=0; i < $scope.gridOptions.data.length; i++){
        level = ($scope.gridOptions.data[i].Codigo.match(/-/g) || []).length;
          if (level > max_level){
            max_level = level;
          };
      };

      for (var i=0; i < $scope.gridOptions.data.length; i++){
        level = ($scope.gridOptions.data[i].Codigo.match(/-/g) || []).length;
        //console.log(level);
        if(level < max_level){
            $scope.gridOptions.data[i].$$treeLevel = level;
        };
      };

    });

    $scope.quitar_padre = function() {
      $scope.codigo_padre = 'Sin Rubro Padre'
      $scope.tipo_plan_hijo = ''
    };

    $scope.actualiza_rubros = function () {
    $http.get('http://localhost:8082/v1/rubro?limit=0&sortby=Codigo&order=desc&query=vigencia%3A' + $scope.selectVigencia).then(function(response) {
      $scope.gridOptions.data = response.data.sort(function(a,b){
        if(a.Codigo < b.Codigo) return -1;
        if(a.Codigo > b.Codigo) return 1;
        return 0;});
      var max_level = 0;
      var level = 0;
      for (var i=0; i < $scope.gridOptions.data.length; i++){
        level = ($scope.gridOptions.data[i].Codigo.match(/-/g) || []).length;
          if (level > max_level){
            max_level = level;
          };
      };

      for (var i=0; i < $scope.gridOptions.data.length; i++){
        level = ($scope.gridOptions.data[i].Codigo.match(/-/g) || []).length;
        //console.log(level);
        if(level < max_level){
            $scope.gridOptions.data[i].$$treeLevel = level;
        };
      };

    });


      };
      $scope.agregar_padre = function(cell) {
            $scope.codigo_padre =cell.entity.Codigo;
            $scope.id_padre = cell.entity.Id;
            $scope.tipo_plan_hijo = cell.entity.TipoPlan
        };

     
      $scope.registrar_rubro = function() {
        var codigo_rubro = "";
        var id_hijo = 0;
        var rubro_padre;
        var config = {
               headers : {
                   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
               }
           }

        if( $scope.codigo_padre == 'Sin Rubro Padre'){
          codigo_rubro = codigo_rubro + $scope.codigo_hijo;
        }else{
          codigo_rubro = codigo_rubro + $scope.codigo_padre + "-" + $scope.codigo_hijo;

            rubro_padre= {
                  Id : parseInt($scope.id_padre)
              };
              
        }
        var entidad = {
              Id: parseInt($scope.selectEntidad)
          };
        var rubro_hijo = {
              Vigencia: parseInt($scope.selectVigencia),
              Entidad: entidad,
              Codigo: codigo_rubro,
              Descripcion: $scope.descripcion_hijo,
              TipoPlan: parseInt($scope.tipo_plan_hijo)
          };

         if(rubro_padre != null){
            var rubro_rubro = {
                  RubroPadre : rubro_padre,
                  RubroHijo: rubro_hijo
                }
            $http.post("http://localhost:8082/v1/rubro/registrar_padre", rubro_rubro, config).success(function(data) {
                   var id_rubro_rubro = data;
                   if(typeof(id_rubro_rubro)=="number"){
                    if(id_rubro_rubro > 0){
                      $scope.ultimo_registro = rubro_hijo.Codigo;
                      alert("Relacion Rubro Padre - Hijo Registrada");
                    }else{
                      alert("Transaccion no realizada debido a un error");
                    }
                     
                     $http.get('http://localhost:8082/v1/rubro/?limit=0&sortby=Id&order=desc&query=vigencia%3A' + $scope.selectVigencia).then(function(response) {
                            $scope.gridOptions.data = response.data.sort(function(a,b){
                              if(a.Codigo < b.Codigo) return -1;
                              if(a.Codigo > b.Codigo) return 1;
                              return 0;});
                            var max_level = 0;
                            var level = 0;
                            for (var i=0; i < $scope.gridOptions.data.length; i++){
                              level = ($scope.gridOptions.data[i].Codigo.match(/-/g) || []).length;
                                if (level > max_level){
                                  max_level = level;
                                };
                                
                            };

                            for (var i=0; i < $scope.gridOptions.data.length; i++){
                              level = ($scope.gridOptions.data[i].Codigo.match(/-/g) || []).length;
                              //console.log(level);
                              if(level < max_level){
                                  $scope.gridOptions.data[i].$$treeLevel = level;
                              };
                            };

                          });
                     console.log(id_rubro_rubro);
                   }
                   if(typeof(id_rubro_rubro)=="object"){
                      alert(data.Detail);
                   }
                 });;

         }else{
            $http.post("http://localhost:8082/v1/rubro", rubro_hijo, config).success(function(data) {
            id_hijo = data;
            if(typeof(id_hijo)=="number"){
              if(id_hijo > 0){
                $scope.ultimo_registro = rubro_hijo.Codigo;
                alert("Rubro Registrado");
              }else{
                alert("Transaccion no realizada debido a un error");
              }
              
              $http.get('http://localhost:8082/v1/rubro/?limit=0&sortby=Id&order=desc&query=vigencia%3A' + $scope.selectVigencia).then(function(response) {
                    $scope.gridOptions.data = response.data.sort(function(a,b){
                      if(a.Codigo < b.Codigo) return -1;
                      if(a.Codigo > b.Codigo) return 1;
                      return 0;});
                    var max_level = 0;
                    var level = 0;
                    for (var i=0; i < $scope.gridOptions.data.length; i++){
                      level = ($scope.gridOptions.data[i].Codigo.match(/-/g) || []).length;
                        if (level > max_level){
                          max_level = level;
                        };
                    };

                    for (var i=0; i < $scope.gridOptions.data.length; i++){
                      level = ($scope.gridOptions.data[i].Codigo.match(/-/g) || []).length;
                      //console.log(level);
                      if(level < max_level){
                          $scope.gridOptions.data[i].$$treeLevel = level;
                      };
                    };

                  });
            }
            if(typeof(id_hijo)=="object"){
              alert(data.Detail);
            }
            console.log(data);
            });;
         }
         /*$http.post("http://localhost:8082/v1/rubro", rubro_hijo, config).success(function(data) {
            id_hijo = data;
            if(typeof(id_hijo)=="number"){
              alert("Rubro Registrado");
              if(rubro_padre != null){
                var rubro_hijo = {
                  Id: id_hijo
                }
                var rubro_rubro = {
                  RubroPadre : rubro_padre,
                  RubroHijo: rubro_hijo
                }
                console.log(rubro_rubro);
                $http.post("http://localhost:8082/v1/rubro/registrar_padre", rubro_rubro, config).success(function(data) {
                   var id_rubro_rubro = data;
                   if(typeof(id_rubro_rubro)=="number"){
                     alert("Relacion Rubro Padre - Hijo Registrada");
                   }
                   if(typeof(id_rubro_rubro)=="object"){
                      alert(data.Detail);
                   }
                 });;
              }
              $http.get('http://localhost:8082/v1/rubro/?limit=0&query=vigencia%3A' + $scope.selectVigencia).success(function (data) {
                $scope.gridOptions.data = data;
                });
            }
            if(typeof(id_hijo)=="object"){
              alert(data.Detail);
            }
            console.log(data);
            });;*/

        };
  });

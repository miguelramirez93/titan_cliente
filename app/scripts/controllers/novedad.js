'use strict';

/**
 * @ngdoc function
 * @name novedadesApp.controller:NovedadCtrl
 * @description
 * # NovedadCtrl
 * Controller of the novedadesApp
 */
angular.module('titanClienteYeoApp')
  .controller('NovedadCtrl', function ($scope, $http, $location) {
    $scope.title = 'Registro novedad';

    $scope.novedad = {};


    var ruta = 'http://10.20.2.129:8081/v1/';
    $http.get(ruta + '/categoria_novedad').then(function(response) {
      $scope.categoria = response.data;
    });

    $http.get(ruta + '/informacion_proveedor?limit=0').then(function(response) {
      $scope.proveedor = response.data;
    });

    $scope.guardar = function() {

    var categoria = { Id: parseInt($scope.id_categoria)};
    var proveedor = { NumDocumento: parseInt($scope.id_proveedor)};

    var novedad = {
      IdCategoria: categoria,
      Estado: 'Activo',
      Nombre: $scope.nombre,
      Simbolo: null,
      Naturaleza: $scope.naturaleza,
      Descripcion: $scope.descripcion,
      TipoNovedad: $scope.tipo,
      Formula: null,
      IdProveedor: proveedor
    };

      $scope.novedad = novedad;

      console.log('Novedad: ' + $scope.novedad);

      $http.post(ruta + '/novedad', $scope.novedad).then(function(response) {
        console.log(response);
        if(response.statusText === 'OK') alert('Novedad registrada exitosamente');
      });
    };

  });

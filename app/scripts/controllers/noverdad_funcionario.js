'use strict';

/**
 * @ngdoc function
 * @name novedadesApp.controller:NoverdadFuncionarioCtrl
 * @description
 * # NoverdadFuncionarioCtrl
 * Controller of the novedadesApp
 */
angular.module('titanClienteYeoApp')
  .controller('NoverdadFuncionarioCtrl', function ($scope, $http, $location) {

    $scope.detalle_novedad = {};
    var ruta = 'http://10.20.2.129:8081/v1/';
    var id_novedad = 0;
    $scope.nombre_novedad = '';
    var num_cuenta = 0;
    var num_documento = 0;

    //Buscar funcionario
    $scope.buscarFuncionario = function() {
      $http.get(ruta + '/acta_inicio?query=NumeroContrato.Contratista.NumDocumento:'+$scope.cedulaFuncionario).then(
        function(response) {
          if(response.data != null) {
              $scope.funcionario = response.data[0].NumeroContrato.Contratista.NomProveedor;
              num_cuenta = response.data[0].NumeroContrato.Contratista.NumCuentaBancaria;
              num_documento = response.data[0].NumeroContrato.Contratista.NumDocumento;
          } else {
            $scope.funcionario = 'No hay datos que coincidan con su busqueda';
          }

        });
    };

    //TRAER NOVEDADES
    $http.get(ruta + '/novedad').then(function(response) {
      $scope.data = response.data;
      $scope.novedad = [{}];

      for(var i = 0; i < Object.keys($scope.data).length; i++)
      {
        $scope.novedad.push({
          "Id": $scope.data[i].Id,
          "Nombre": $scope.data[i].Nombre,
          "Naturaleza": $scope.data[i].Naturaleza,
          "Descripción": $scope.data[i].Descripcion,
          "Tipo Novedad": $scope.data[i].TipoNovedad
        });
      };
    });

    $scope.imprimir = function(id, nombre) {
      id_novedad = id;
      $scope.nombre_novedad = nombre;
      console.log(id + '' + nombre);
    }

    //Registrar novedad tercero
    $scope.guardar = function() {

      var novedad = { Id: id_novedad };

      var detalle_novedad = {
        Persona: num_documento,
        Estado: $scope.estado,
        Vigencia: parseInt($scope.vigencia),
        Tipo: null,
        Valor: parseInt($scope.valor),
        Cuenta: num_cuenta,
        Novedad: novedad
      };

      $scope.detalle_novedad = detalle_novedad;
      $http.post(ruta + '/detalle_novedad', $scope.detalle_novedad).then(function(response) {
        console.log(response.statusText);
        if(response.statusText === 'Created') alert("Novedad registrada exitosamente");
      });
    }
  });

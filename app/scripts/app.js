'use strict';

/**
 * @ngdoc overview
 * @name nixClienteYeoApp
 * @description
 * # nixClienteYeoApp
 *
 * Main module of the application.
 */
angular
  .module('titanClienteYeoApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.treeView',
    'ui.grid.selection',
    'ui.grid.resizeColumns',
    'ui.grid.pagination',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/nomina_registro', {
        templateUrl: 'views/nomina_registro.html',
        controller: 'NominaRegistroCtrl',
        controllerAs: 'nominaregistro'
      })
      .when('/preliquidacion_registro', {
        templateUrl: 'views/preliquidacion_registro.html',
        controller: 'PreliquidacionRegistroCtrl',
        controllerAs: 'preliquidacionregistro'
      })
      .when('/preliquidacion_detalle', {
        templateUrl: 'views/preliquidacion_detalle.html',
        controller: 'PreliquidacionDetalleCtrl',
        controllerAs: 'preliquidaciondetalle'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

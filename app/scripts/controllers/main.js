'use strict';

/**
 * @ngdoc function
 * @name nixClienteYeoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nixClienteYeoApp
 */
var app = angular.module('titanClienteYeoApp')
	app.constant('CONFIG', {
	APIURLCRUD: "http://localhost:8081/v1/",
	APIURLMID: "http://localhost:8082/v1/"
})
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

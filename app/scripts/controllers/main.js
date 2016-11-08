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
	APIURLCRUD: "http://10.20.2.129:8081/v1/",
	APIURLMID: "http://10.20.2.129:8082/v1/"
})
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

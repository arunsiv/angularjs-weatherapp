//MODULE
var weatherApp = angular.module("weatherApp", ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/pages/main.html',
            controller: 'mainController'
        })
    
        .when('/forecast', {
            templateUrl: '/pages/forecast.html',
            controller: 'forecastController'
        })
});

//CONTROLLER
weatherApp.controller('mainController', ['$scope', '$log', 'weatherService', function ($scope, $log, weatherService) {
    $log.info('Main Controller');
    
    $scope.city = weatherService.city;
    $scope.$watch('city', function(){
        weatherService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$log', 'weatherService', function ($scope, $resource, $log, weatherService) {
    $log.info('Forecast Controller');
    
    var currentWeatherAPI = "http://api.openweathermap.org/data/2.5/weather";
    var fiveDayWeatherAPI = "http://api.openweathermap.org/data/2.5/forecast";
    var key = "7e1adc5df1abac4afd81b0c5dbb14b11";
    
    $scope.city = weatherService.city;    
    
    $scope.weatherAPI = $resource(fiveDayWeatherAPI, {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, appid: key });
    
    $log.log($scope.weatherResult);
}]);

//SERVICE
weatherApp.service('weatherService', function() {
    this.city = 'Mauldin,SC';
});
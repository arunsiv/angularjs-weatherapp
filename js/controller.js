//CONTROLLER
weatherApp.controller('mainController', ['$scope', 'weatherService', function ($scope, weatherService) {
    $scope.city = weatherService.city;
    $scope.$watch('city', function(){
        weatherService.city = $scope.city;
    });    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'weatherService', function ($scope, $resource, $routeParams, weatherService) {
    var API = "";
    var key = "7e1adc5df1abac4afd81b0c5dbb14b11";

    $scope.city = weatherService.city;
    $scope.days = $routeParams.days;
    
    if ($scope.days === '5') {
        API = "http://api.openweathermap.org/data/2.5/forecast";
    } else {
        API = "http://api.openweathermap.org/data/2.5/weather";
    }

    $scope.weatherAPI = $resource(API, {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, appid: key });
    
    $scope.convertToCelcius = function (degK) {
        return parseFloat(degK - 273.15).toFixed(2);
    };
    
    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    };
}]);
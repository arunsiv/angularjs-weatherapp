//CONTROLLER
weatherApp.controller('mainController', ['$scope', '$log', 'weatherService', function ($scope, $log, weatherService) {
    $log.info('Main Controller');
    
    $scope.city = weatherService.city;
    $scope.$watch('city', function(){
        weatherService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', '$log', 'weatherService', function ($scope, $resource, $routeParams, $log, weatherService) {
    
    var API = "";
    var key = "7e1adc5df1abac4afd81b0c5dbb14b11";

    $scope.city = weatherService.city;
    $scope.days = $routeParams.days;
    
    $log.log($scope.days);
    
    if ($scope.days === '5') {
        $log.log("if: " + $scope.days);
        API = "http://api.openweathermap.org/data/2.5/forecast";
    } else {
        $log.log("else: " + $scope.days);
        API = "http://api.openweathermap.org/data/2.5/weather";
    }
    
     $log.log("API: " + API);
    
    $scope.weatherAPI = $resource(API, {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, appid: key });
    
    $log.log($scope.weatherResult);
    
    $scope.convertToCelcius = function (degK) {
        var celcius = degK - 273.15;
        return parseFloat(celcius).toFixed(2);
    };
    
    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    };
}]);
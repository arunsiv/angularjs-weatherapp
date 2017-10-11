//ROUTES
weatherApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/pages/main.html',
            controller: 'mainController'
        })
    
        .when('/forecast/:days', {
            templateUrl: '/pages/forecast.html',
            controller: 'forecastController'
        })
});
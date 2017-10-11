//DIRECTIVES
weatherApp.directive('forecastResult', function() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/directives/forecast_template.html',
        scope: {
            weatherResultObject: '=',
            forecastConvertToCelcius: '&',
            forecastConvertToDate: '&',
            dateFormat: "@"
        }
    }
});
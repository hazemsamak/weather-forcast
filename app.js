// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    .when('/forecast/:count', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = "Cairo,EG";
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
     
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource','$filter','$routeParams','cityService', function($scope, $resource,$filter,$routeParams ,cityService) {
    
    $scope.city = cityService.city;
    $scope.count = $routeParams.count || '2';
    //api.openweathermap.org/data/2.5/forecast
    //http://api.openweathermap.org/data/2.5/weather
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast"
    ,     {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}}
    );
    
    $scope.weatherResults = $scope.weatherAPI.get(
        {q: $scope.city
         , appid: '61307061ea823edc7a2a4ee709b2530b'
         ,units: 'metric'
         ,cnt: $scope.count 
        }
    );
    
    $scope.convertToDate = function(dt)
    {
        return new Date(dt * 1000);
    }
}]);
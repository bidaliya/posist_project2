    /// <reference path = "/Users/tarunbidaliya/Downloads/angular-1.6.0/angular.min.js"/>


    var myApp = angular.module("form2App",['ngRoute']).run(function($rootScope){
      $rootScope.name = "Tarun"
    });

    myApp.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/',{
            templateUrl:'views/signUp2.html' ,
            controller: 'signUpController'
         })
        .when('/login2',{
           templateUrl:'views/login2.html' ,
           controller: 'loginController'
        })
        .when('/signUp2',{
            templateUrl:'views/signUp2.html' ,
            controller: 'signUpController'
         })
         .when('/home',{
            templateUrl:'Home/Home.html' ,
            controller: 'homeController'
         })
         .otherwise({
            redirectTo:'/signUp2'
         })
    }]);

    myApp.controller("formController", function ($scope, $rootScope) {
        $scope.name = $rootScope.loggedInUsername;
        //console.log($rootScope.name);
    });
'use strict';

(function(){

  var app = angular.module('portfolioSiteApp', ['ngAnimate', 'ngRoute', 'ngTouch']);

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/touch_hover', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/ping_app', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/adaptive_ux', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/canvas_interactions', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/ppi_guidelines', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      });
  });

  app.controller('MainCtrl', ['$rootScope', '$http', function ($rootScope, $http) {
    $rootScope.projects = [];

    $http.get('views/projects.json').success(function(data) {
      $rootScope.projects = data;
    });
  }]);

  app.controller('ProjectCtrl', ['$rootScope', '$location', function($rootScope, $location) {
    console.log($location.path());

    this.currentProject = $rootScope.projects[$location.path().substring(1)];

    this.hasIssues = function() {
      return this.currentProject.issues !== null && this.currentProject.issues.length > 0;
    };

    this.hasApproach = function() {
      return this.currentProject.approach !== null && this.currentProject.approach.length > 0;
    };
  }]);

})();
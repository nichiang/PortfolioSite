'use strict';

(function(){

  var app = angular.module('portfolioSiteApp', ['ngAnimate', 'ngRoute', 'ngTouch']);

  app.config(function($routeProvider, $locationProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from outer templates domain.
      'http://www.youtube.com/embed/**',
      'https://www.youtube.com/embed/**',
      'https://www.scribd.com/embeds/**'
    ]); 

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
      .when('/canvas_nav', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/ppi_guidelines', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/branding_exercise', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/concert_poster', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/logo_explorations', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      })
      .when('/coffee_table', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      });

    $locationProvider.html5Mode(false);
  });

  app.controller('MainCtrl', ['$rootScope', '$http', function ($rootScope, $http) {
    $rootScope.projects = [];

    $http.get('views/projects.json').success(function(data) {
      $rootScope.projects = data;
    });
  }]);

  app.controller('ProjectCtrl', ['$rootScope', '$location', function($rootScope, $location) {
    this.currentPath = $location.path().substring(1);
    this.currentProject = $rootScope.projects[this.currentPath];

    this.hasRoles = function() {
      return typeof this.currentProject.roles !== 'undefined' && this.currentProject.roles.length > 0;
    };

    this.hasSkills = function() {
      return typeof this.currentProject.skills !== 'undefined' && this.currentProject.skills.length > 0;
    };

    this.hasIssues = function() {
      return typeof this.currentProject.issues !== 'undefined' && this.currentProject.issues.length > 0;
    };

    this.hasApproach = function() {
      return typeof this.currentProject.approach !== 'undefined' && this.currentProject.approach.length > 0;
    };

    this.hasImages = function() {
      return typeof this.currentProject.imageCaptions !== 'undefined' && this.currentProject.imageCaptions.length > 0;
    };

    this.hasEmbeds = function() {
      return typeof this.currentProject.embedCaptions !== 'undefined' && this.currentProject.embedCaptions.length > 0;
    };
  }]);

  app.filter('arrayString', function() {
    return function(input) {
      if (typeof input !== 'undefined')
        return input.join(', ');
      else
        return "";
    };
  });

})();
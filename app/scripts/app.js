'use strict';

(function(){

  var app = angular.module('portfolioSiteApp', ['ngAnimate', 'ngRoute', 'ngSanitize', 'angulartics', 'angulartics.google.analytics']);

  app.config(function($routeProvider, $sceDelegateProvider, $compileProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from outer templates domain.
      'http://www.youtube.com/embed/**',
      'https://www.youtube.com/embed/**',
      'https://www.scribd.com/embeds/**',
      'https://onedrive.live.com/**'
    ]); 

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'projectCtrl'
      });

    $compileProvider.debugInfoEnabled(false);
  });

  app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
    $rootScope.$on('$routeChangeSuccess', function() {
      if (!$window.ga)
        return;

      $window.ga('send', 'pageview', { page: $location.path() });
    });
  }]);

  app.controller('MainCtrl', ['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
    $rootScope.projects = [];

    $http.get('views/projects.json').success(function(data) {
      $rootScope.projects = data;
    });

    this.activePage = function(currentPage) {
      if ($location.path().substring(1) === currentPage) {
        return 'active';
      } else {
        return '';
      }
    };
  }]);

  app.controller('ProjectCtrl', ['$rootScope', '$location', function($rootScope, $location) {
    this.currentPath = $location.path().substring(1);
    this.currentProject = $rootScope.projects[this.currentPath];
    this.showImage = [];
    
    this.closeGallery = function() {
      if (typeof this.currentProject.imageCaptions !== 'undefined') {
        for (var i = 0; i < this.currentProject.imageCaptions.length; i++) {
          this.showImage[i] = false;
        }
      }
    };

    this.closeGallery();

    this.toggleGallery = function(imageId) {
      this.showImage[imageId] = !this.showImage[imageId];
    };

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
      if (typeof input !== 'undefined') {
        return input.join(', ');
      } else {
        return '';
      }
    };
  });

})();
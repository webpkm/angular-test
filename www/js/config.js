CP.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/news/:category/:newsId', {
    templateUrl: 'partials/news-details.html',
    controller: 'NewsDetailsController',
    resolve: {
      // I will cause a 1 second delay
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 0);
        return delay.promise;
      }
    }
  })
  .when('/news/:category', {
	  templateUrl: 'partials/news-category.html',
	  controller: 'NewsCategoryController'
  })
  .when('/statewise/:stateName', {
	  templateUrl: 'partials/news-statewise-details.html',
	  controller: 'NewsStatewiseDetailsController'
  })
  .when('/statewise', {
	  templateUrl: 'partials/news-statewise.html',
	  controller: 'NewsStatewiseController'
  })
  .when('/news', {
	  templateUrl: 'partials/news.html',
	  controller: 'NewsController'
  })
  .when('/about', {
	  templateUrl: 'partials/about.html',
	  controller: 'AboutController'
  })
  .when('/feedback', {
	  templateUrl: 'partials/feedback.html',
	  controller: 'FeedbackController'
  })
  .when('/settings', {
	  templateUrl: 'partials/settings.html',
	  controller: 'SettingsController'
  })
  .when('/', {
	  templateUrl: 'partials/news-category-home.html',
	  controller: 'NewsCategoryHomeController'
  })
  .otherwise({ redirectTo: '/' });

  // @TODO I have to write otherwise and 404 page handling
  // configure html5 to get links working on jsfiddle
  // $locationProvider.html5Mode(true);
});


//var FONT_SIZE = "14px";
//var THEME = "14px";
//var JAGRAN_SERVICE_URL = "14px";
//var GOOGLE_SERVICE_URL = "14px";
//var IS_DEVELOPER = true;
//var IS_OFFLINE = true;
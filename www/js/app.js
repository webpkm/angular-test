/* global FastClick, smoothScroll */
var CP = angular.module('codeplaygrounds.news', ['ui.bootstrap', 'ngTouch', 'ngAnimate', 'ngSanitize', 'ngRoute'], function($httpProvider){
  if (!!window.FastClick) {
    FastClick.attach(document.body);
  }
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).run(['$location', function($location){
  //Allows us to navigate to the correct element on initialization
  if ($location.path() !== '' && $location.path() !== '/') {
    smoothScroll(document.getElementById($location.path().substring(1)), 500, function(el) {
      location.replace('#' + el.id);
    });
  }
}]);

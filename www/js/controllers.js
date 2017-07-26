CP

.controller('NewsDetailsController', function($scope, $rootScope, $routeParams, $sce, $window) {
     $scope.name = "NewsDetailsController";
     debugger;
     console.log($rootScope.settings);
     $scope.params = $routeParams;
     var newsList = JSON.parse(localStorage.getItem($routeParams.category));
     //$scope.news = newsList[$routeParams.newsId];
     $scope.news = newsList[$routeParams.newsId].body.__cdata;
     console.log("News Detauils", newsList[$routeParams.newsId].body);
     $scope.newsThumbnail = newsList[$routeParams.newsId].imgname1.__cdata;
     //$scope.news = $sce.parseAsHtml(newsList[$routeParams.newsId].body.__cdata);
     $scope.fontSize = 14;
     $scope.setMainFontSize = function() {
		document.body.style.fontSize = $scope.fontSize + "px";
	};
	 $scope.swipe = '';

	/*
	 * @TODO check how to communicate with the main controller and normal controller to get the access of the 'swipe' variable
	 */
	 $scope.swipeRight = function(){
	 	$scope.swipe = 'r';
	 };

	 $scope.swipeLeft = function(){
	 	$scope.swipe = 'l';
	 };
     /*
      * Here l = left swipe
      * and  r = right swipe
      */
     //$rootScope.category = $routeParams.category;
     $rootScope.showBackButton = $routeParams.category ? true : false;
     $scope.$watch(function(scope) { return scope.swipe },
      	function(newValue, oldValue) {
      		$scope.swipe = '';
      		var newsId = parseInt($scope.params.newsId);
      		var categories = JSON.parse(localStorage.getItem("categories"));
      		var currentCategoryIndex = categories.indexOf($scope.params.category);
			if(newValue == 'r') {
				newsId--;
			}
			if(newValue == 'l') {
				newsId++;
			}
			if((newValue == 'l' || newValue == 'r')) {
				if(newsId >= 0 && newsId < $rootScope.NEWS_MAX_LIMIT) {
				    $window.location.href = '#/news/' + $scope.params.category + "/" + newsId;
				} else {
					//debugger;
					// condition to check if the next category is exist
					if(newValue == 'r') {
						currentCategoryIndex--;
						newsId = $rootScope.NEWS_MAX_LIMIT - 1;
					}
					if(newValue == 'l') {
						currentCategoryIndex++;
						newsId = 0;
					}
					/* config page varibales
					var FIXED_HEADER = true;
					var FIXED_NAVIGATION_HEADER = true;
					var FONT_SIZE = true;
					var THEME_NAME = true;
					var NOTIFICATION_SOUND = true;
					var ALLOW_NOTIFICATION = true;
					*/
					var ALLOW_TO_OPEN_NEXT_CATEGORY = true;
					
					if(ALLOW_TO_OPEN_NEXT_CATEGORY && categories.indexOf(categories[currentCategoryIndex]) >= 0) {
						$window.location.href = '#/news/' + categories[currentCategoryIndex] + "/" + newsId;
					} else {
						//$window.location.href = '#/news/' + $scope.params.category + "/";
						$rootScope.showBackButton = false;
						$window.location.href = '#/news/';
					}
				}
			}
	      	//console.log("New:", newValue);
	      	//console.log("New:", oldValue);
      	}
     );
})


.controller('NewsCategoryController', function($scope, $rootScope, $routeParams) {
     $scope.name = "NewsCategoryController";
     $scope.params = $routeParams;
     
     // This will get the 10 news list
	$scope.newsList = JSON.parse(localStorage.getItem($routeParams.category));
	$rootScope.showBackButton = $routeParams.category ? true : false;
})

.controller('NewsController', function($scope, $routeParams, $http) {
     $scope.name = "NewsController";
     $scope.params = $routeParams;
    // Grab old version docs
	/* $http.get('./xml/cricket-news.xml')
	.then(function(result) {
	  //console.log(result.data);
	  	var parser = new X2JS();
	  	var ResponseJSON = parser.xml2json(result.data);
	  	console.log(ResponseJSON);
	  	var allNews = parser.xml_str2json(result.data);
	  	var category=[];
	  	allNews.home.category.forEach(function (news) {
	  		localStorage.setItem(news._name, news.news);
	  		category.push(news._name);
  		});
  		localStorage.setItem("category", category);
  		// This will get the 10 news list
  		var news = JSON.parse(localStorage.getItem("national"));
	}); */
	$scope.categories = JSON.parse(localStorage.getItem("categories"));
	// This will get the 10 news list
	//var news = JSON.parse(localStorage.getItem("national"));
})

.controller('NewsCategoryHomeController', function($scope, $routeParams, $http) {
    $scope.name = "NewsCategoryHomeController";
    $scope.params = $routeParams;
    var N = 20; 
	//$scope.newsList = newsCategory;//Array.apply(null, {length: N}).map(Number.call, Number);
	
	var newsCategory = [
		{title: "Top News", url: '#/news', imageUrl : '', serviceUrl: 'category.jsp?type=topnews'},	
		{title: "National", url: '#/news/national', imageUrl : '', serviceUrl: 'jagranJsonFeed.jsp?key=news.news.national'},	
		{title: "Cricket", url: '#/news/cricket', imageUrl : '', serviceUrl: '?key=news.news.sports'},	
		{title: "Entertainment", url: '#/news/entertainment', imageUrl : '', serviceUrl: '?key=news.news.sports'},	
		{title: "Technology", url: '#/news/technology', imageUrl : '', serviceUrl: '?key=news.news.sports'},	
		{title: "World News", url: '#/world-news', imageUrl : '', serviceUrl: 'apps/jagranJsonFeed.jsp?key=news.news.world'},	
		{title: "Business", url: '#/business', imageUrl : '', serviceUrl: 'apps/jagranJsonFeed.jsp?key=news.news.business'},	

		//Category News State wise
		{title: "Satate wise", url: '#/statewise', imageUrl : '', serviceUrl: 'home/home.jsp?state=uttar-pradesh&city=Mirzapur'}
	];
 
 	$scope.newsList = newsCategory;    
 	/*
 	$http.get('https://rssm-jag.jagranjosh.com/JagranApsFeeds/feed/apps/jagranJsonFeed.jsp?key=news.news.national')
	.then(function(result) {
		console.log(result);
		$scope.result = result;
	});*/
})

.controller('AboutController', function($scope, $routeParams) {
     $scope.name = "AboutController";
     $scope.params = $routeParams;
})

.controller('FeedbackController', function($scope, $routeParams) {
     $scope.name = "FeedbackController";
     $scope.params = $routeParams;
})

.controller('NewsStatewiseController', function($scope, $routeParams) {
     $scope.name = "NewsStatewiseController";
     $scope.params = $routeParams;
})

.controller('NewsStatewiseDetailsController', function($scope, $routeParams) {
     $scope.name = "NewsStatewiseDetailsController";
     $scope.params = $routeParams;
     
     var news = JSON.parse(localStorage.getItem($routeParams.stateName));
     
     $scope.news = news.body.__cdata;
     $scope.newsThumbnail = news.imgname1.__cdata;
     
})

.controller('SettingsController', function($scope, $rootScope, $routeParams) {
    $scope.name = "SettingsController";
    $scope.params = $routeParams;
	
	var settings = $rootScope.settings;
	
	/*var FIXED_HEADER = true;
	var FIXED_NAVIGATION_HEADER = true;
	var FONT_SIZE = true;
	var THEME_NAME = true;
	var NOTIFICATION_SOUND = true;
	var ALLOW_NOTIFICATION = true;
	*/

	$scope.fontSize = settings.FONT_SIZE;
	
	var fontSize = parseInt($scope.fontSize);
    $scope.setMainFontSize = function(action) {
    	switch(action) {
    		case '+' :
    		fontSize++;
    		break;
    		case '-' :
    		fontSize--;
    		break;
    	}
    	$scope.fontSize = fontSize + "px";
	};
	
	$scope.saveSettings = function() {
		// Get all the settings value then set it in settings
		settings.FONT_SIZE = $scope.fontSize;
		
		
		localStorage.setItem("settings", JSON.stringify(settings));
		$rootScope.settings = settings;
		console.log("All settings are saved!");
	};
     
});

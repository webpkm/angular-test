CP.controller('MainCtrl', function($scope, $rootScope, $http, $document, $uibModal, $timeout, $routeParams, $window) {
  // Grab old version docs
	
	$scope.params = $routeParams;
	/*
	 * Get all the news and set to the localStorage
	 */
	$timeout(function() {
//		$http.get('https://rssm-jag.jagranjosh.com/JagranApsFeeds/feed/apps/jagranJsonFeed.jsp?key=news.cricket.headlines')
		$http.get('https://rssm-jag.jagranjosh.com/JagranApsFeeds/feed/home/home.jsp?category=national;cricket;entertainment;technology')
		.then(function(result) {
			//console.log(result.data);
			var parser = new X2JS();
			var allNews = parser.xml_str2json(result.data);
			var categories = [];
			var newsLength = 10;
			allNews.home.category.forEach(function (news) {
				localStorage.setItem(news._name, JSON.stringify(news.news));
				categories.push(news._name);
				newsLength = news.news.length;
			});
			
			localStorage.setItem("categories", JSON.stringify(categories));
			$rootScope.NEWS_MAX_LIMIT = newsLength;
			// This will get the 10 news list
			//var news = JSON.parse(localStorage.getItem("national"));
		});
	}, 1000);	
	
	$rootScope.stateNames = ["new-delhi", "uttar-pradesh", "himachal-pradesh", "jharkhand", "bihar", "chhattisgarh", "gujarat", "haryana", "jammu-and-kashmir", "madhya-pradesh", "maharashtra", "odisha", "punjab", "rajasthan", "uttarakhand", "west-bengal"];
	
	$timeout(function() {
		$rootScope.stateNames.forEach(function(stateName) {
			$http.get('./xml/statewise/' + stateName + '.xml')
			.then(function(result) {
			  	var parser = new X2JS();
			  	var allNews = parser.xml_str2json(result.data);
			  	
		  		localStorage.setItem(stateName, JSON.stringify(allNews.home.State.doc));
			});
		});
	}, 2000);	
	
	/*
	 * Code to remove unused link from the jagran.com 
	 */
	var jagranLinks = document.querySelectorAll("a[href^='http://www.jagran.com']")
	jagranLinks.forEach(function(link) {
		link.parentElement.remove();
	});
	var N = 20; 
	
	//$scope.newsList = Array.apply(null, {length: N}).map(Number.call, Number);
	//$scope.newsList = newsCategory; //Array.apply(null, {length: N}).map(Number.call, Number);
	
	$rootScope.settings = typeof localStorage.getItem("settings") === "string" ? JSON.parse(localStorage.getItem("settings")) : {FONT_SIZE : "14px"};
	$rootScope.IMAGE_URL = "http://images.jagran.com/images/";
	$rootScope.sideMenuOpen = false;
	
	$rootScope.toggleSideMenu = function() {
		$rootScope.sideMenuOpen = !$rootScope.sideMenuOpen;
	};
	$rootScope.shareApp = function() {
		window.plugins.socialsharing.share('News Application From CodePlaygrounds.com. Click to download the application.', null, null, 'https://goo.gl/UD6kQJ');
	};
	$rootScope.contactUs = function() {
		cordova.plugins.email.isAvailable(
		    function (isAvailable) {
		        // alert('Service is not available') unless isAvailable;
		    }
		);
		
		cordova.plugins.email.open({
		    to:      'codeplaygrounds@gmail.com',
		    subject: 'Contact Us',
		    body:    '<p>Hi,<br> I just want to let you know that this application has some error. Please resolve it.<p> <br><br><br><b>Application Details:</b> <br> Application Version: 0.0.1, <br> Device Details: Android<br>',
		    isHtml:  true
		});
	};
	$rootScope.checkMobileNetwork = function() {
		var networkState = navigator.connection.type;
		if(networkState === Connection.CELL_2G || networkState === Connection.CELL_3G || networkState === Connection.CELL_4G || networkState === Connection.CELL){
			confirm("You are using your mobile data. Are you sure?", function(buttonNumber) {
				if(buttonNumber === 1) {
					alert("Downloaded Successfully!");
				} else if(buttonNumber === 2) {
					alert("You aborted!");
				}
			}, "Confirm to use mobile data", ["Okay", "No"]);
		}
		if(navigator.connection.type === Connection.NONE) {
			alert("No internet connection, Please check your internet.");
		}
	};
	$rootScope.parseInt = parseInt;
	$rootScope.goBack = function() {
		/*
		 * I have to write code to use the $location provider.
		 */
		//history.back();
		//debugger;
		if(typeof $routeParams.category !== "undefined" && typeof $routeParams.newsId !== "undefined") {
			$window.location.href = '#/news/' + $routeParams.category;
		} else {
			$window.location.href = '#/news/';
			$rootScope.showBackButton = false;
		}
	}
	 document.addEventListener('deviceready', onDeviceReady, false);

	    function onDeviceReady() {
			cordova.getAppVersion.getVersionNumber().then(function (version) {
				/*
				 * Change the timeout to differ and promise way
				 */
				$timeout(function() {
				      $rootScope.app = {};
				      $rootScope.app.version = version;
			    }, 0);
			});
	    }
});
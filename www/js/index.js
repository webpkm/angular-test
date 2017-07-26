var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //universalLinks.subscribe("openNews", app.didLaunchAppFromLink);
    },
/*
    didLaunchAppFromLink: function(eventData) {
      alert('Did launch application from the link: ' + eventData.url);
      console.log(eventData);
    },
    */
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    	window.alert = navigator.notification.alert;
    	window.confirm = navigator.notification.confirm;
    	
		if(navigator.connection.type === Connection.NONE) {
			alert("No internet connection, Please check your internet.");
		}
		
		StatusBar.backgroundColorByHexString("#6f5499");
    }
};

app.initialize();
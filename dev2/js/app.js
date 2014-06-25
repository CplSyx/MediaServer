/* //Step 1 - process the static array
(function(){

    var app = angular.module('mediaServer', []);
    
    app.controller('MovieListController', function(){
        this.date = Date.now();
        this.movies = movieList;
        
    });
    
    var movieList = [
        { title: 'Fast and Furious' },
        { title: 'Office Space' },
        { title: 'Hero' },
        { title: 'Despicable Me'},
    ];
})();
*/


//Step 2 - process from an external source
(function(){

    var app = angular.module('mediaServer', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ngTouch', 'ng']); //As ngRoute is not part of angular.js we must inject the dependency here in order to use $routeProvider later on

    app.factory('movieList', function($http) {
        var movies = {
            list: [],
            loaded: false,
            error: false
        };

        $http.get('api/movies.json').success(function(data){
            console.log("Grabbing data from DB");
            angular.copy(data, movies.list); 
            movies.loaded = true;
        }).error(function(data){
            movies.error = true;
        });
        
        return movies;
    });
    
    
    
    
    //Controller for movie list
    app.controller('MovieListController', ['movieList', function(movies){
        this.movies = movies;
    }]);
    
    //Controller for individiual movie details
    app.controller('MovieDetailsController', ['$http', '$routeParams', 'movieList', function($http, $routeParams, movies){
        
        //Grab the movieid from the parameters
        if($routeParams !== undefined) {
            this.movieID = $routeParams.movieid;
            console.log("Movie id:"+this.movieID);
        } else {
            this.movieID = 'x';
        }
               
        
        var mdc = this; //needed for the $http request
        this.movie =  []; //Initialise with an empty array so there are no errors whilst we fetch the data.
        this.loaded = false; //used to hide/show progress bar
        this.error = false;
        
        if(this.movieID != 'x'){
            $http.get('api/moviedetail.json?mid='+this.movieID).success(function(data){
                mdc.movie = data; //can't use 'this' here to refer to the array, as 'this' in the current scope is $http
                mdc.loaded = true;
                if(mdc.movie.imdbID === undefined)
                    mdc.error = true;
            }).error(function(data){
                mdc.error = true;
            });
        }
        
        //For the buttons on the page; a very basic method to move to the next movie
        this.previousMovieID = parseInt(this.movieID) - 1;
        this.nextMovieID = parseInt(this.movieID) + 1;
        
        this.updateMovieWatched = function(watchedVal) {   
            console.log("Updating watched value...");
            this.movie.watched = watchedVal;     

            //Use $http.put to update the database
            var data = {
                movieid: this.movieID,
                watched: watchedVal
            }
            $http.put('api/updatewatched.json', data).success(function(data){
                console.log("Done" + data); //If the script fails on the other end, the promise is still true (as $http.put did its bit) and so you'll get "Done" but some error text too.
                
                //Find and update the movie in our cached list so that when we go back to the list, it has the new value.
                for (i = 0; i < movies.list.length; i++) { 
                    if(movies.list[i].movieID == mdc.movieID)
                    {
                        movies.list[i].watched = watchedVal;
                        break;
                    }
  
                }
                
            }).error(function(data){
                console.log("Error" + data);
            });
            
        }
                
        
    }]);
   
   
//Step 3 - Add functionality for Twitter Bootstrap

    //Controller for overall page. Used at present for the highlighting of active pages in the nav
    app.controller('PageController', function($location) {
        this.isActive = function(route) {
            return route === $location.path()? 'active' : '';
        }
        this.link = function(url) {
            $location.path(url);
        }
        
        //Detect Keypresses on application to deal with them
        this.detectKey = function(event) {
            if (event.which==37) //LeftArrow
            {                
                if( /^\/movies\/[0-9]+$/.test($location.path())) //Deal with moviedetails page
                {
                    var matches = $location.path().match(/([0-9]+)$/);
                    this.link("/movies/"+(parseInt(matches[0]) - 1));
                }
            }
            
            if (event.which==39) //RightArrow
            {
                if( /^\/movies\/[0-9]+$/.test($location.path())) //Deal with moviedetails page
                {
                    var matches = $location.path().match(/([0-9]+)$/);
                    this.link("/movies/"+(parseInt(matches[0]) + 1));
                }
            }

        }
        
        //Swipe events (app and also mousedrag)
        this.swipeLeft = function() {            
            this.swipe("l");
        }
        this.swipeRight = function() {
            this.swipe("r");
        }
        
        this.swipe = function(direction){
        
            if( /^\/movies\/[0-9]+$/.test($location.path())) //Deal with moviedetails page
            {
                var matches = $location.path().match(/([0-9]+)$/);
                var alteration = -1;
                if(direction == "r")
                {
                    alteration = 1;
                }
                this.link("/movies/"+(parseInt(matches[0]) +(alteration)));
            }
        }
        
        this.date = Date.now();
    });
    
    //Controller for navigation; controls if box is opened or not.
    app.controller('NavigationController', function(){
        this.isCollapsed = true;
    });

/***** MODALS START *****/    
    //Controller for individual modals
    app.controller('ModalController', function($modal) {
    
        this.loginPrompt = function() {
            var localModal = $modal.open({
                controller: 'ModalMasterController as modal',
                templateUrl: 'partials/login.html',
            });
            localModal.result.then(function ()
            {
                console.log("loginPrompt closed.")
                
            }, function (){
                console.log("loginPrompt dismissed.")
            });
        };
        
        this.helpWindow = function() {
            var localModal = $modal.open({
                controller: 'ModalMasterController as modal',
                templateUrl: 'partials/help.html',
            });
            localModal.result.then(function ()
            {
                console.log("helpWindow closed.")
                
            }, function (){
                console.log("helpWindow dismissed.")
            });
        };
    });
    
    //Controller for all modals (master controller functions)
    app.controller('ModalMasterController', function($modalInstance) {
        this.dismiss = function() { //Use this when cancelling
            $modalInstance.dismiss();
            
        }
        this.close = function() { //Use this when accepting
            $modalInstance.close();
            
        }
    });
    
/***** MODALS END *****/  
    
    //List of partial pages to display
    app.config(function($routeProvider) { 
       
        $routeProvider
        .when('/overview', {templateUrl:'partials/overview.html'})
        .when('/movies', {templateUrl:'partials/movies.html', controller:'MovieListController as movListCtrl'})
        .when('/movies/:movieid', {templateUrl:'partials/moviedetail.html', controller:'MovieDetailsController as movDetCtrl'})
        .when('/tvshows', {templateUrl:'partials/tvshows.html'})
        .when('/other', {templateUrl:'partials/other.html'})
        .otherwise({redirectTo: '/overview'});
    });


//Handle keypress events that are on the page - anywhere
    /*var handler = function(e){
        if(e.which === 39) {
          console.log('right arrow');
          // $scope.doSomething();
        }      
    };

    var $doc = angular.element(document);

    $doc.on('keydown', handler);
    $scope.$on('$destroy',function(){
        $doc.off('keydown', handler);
    })   */ 

})();
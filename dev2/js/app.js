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

   var app = angular.module('mediaServer', []);
    
    app.controller('MovieListController', ['$http', function($http){
        var mlc = this; //needed for the $http request
        
        this.date = Date.now();
        this.movies = []; //Initialise with an empty array so there are no errors whilst we fetch the data.
        this.loaded = false; //used to hide/show progress bar
        this.error = false;
        
        $http.get('api/movies.json').success(function(data){
            mlc.movies = data; //can't use 'this' here to refer to the array, as 'this' in the current scope is $http
            mlc.loaded = true;
        }).error(function(data){
            mlc.error = true;
        });
        
    }]);
   
//Step 3 - Add functionality for Twitter Bootstrap partials

    app.controller('PageController', function($location) {
        this.isActive = function(route) {
            return route === $location.path();
        }
    });
    
    app.config(function($routeProvider) { //List of partial pages to display
       
        $routeProvider
        .when('/movies', {templateUrl:'partials/movies.html', controller:'MovieListController'})
        .when('/tvshows', {templateUrl:'partials/tvshows.html', controller:'TVShowController'})
        .when('/other', {templateUrl:'partials/other.html', controller:'OtherMediaController'})
        //.otherwise({redirectTo: '/overview.html'});
    });
    
})();
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

        
        $http.get('api/movies.json').success(function(data){
            mlc.movies = data; //can't use 'this' here to refer to the array, as 'this' in the current scope is $http
        });
    }]);
})();
(function(){

    var app = angular.module('myapp', []);

    app.factory('movieList', function($http) {
         var output = {
             list: [],
             loaded: false,
             error: false
         };

         $http.get('api/movies.json').success(function(data){
             angular.copy(data, output.list); 
               output.loaded = true;
            }).error(function(data){
               output.error = true;
               output.list = [{"movieID":14},{"movieID":26}]; 
               //Obviously we can't get anything from the $http.get so use some sample data here
            });
        
        return output;
     });

    app.controller('MovieListController', ['movieList', function(output){
         this.movies = output;
    }]);
})();

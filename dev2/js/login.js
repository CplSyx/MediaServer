
    app.controller("LoginController", function(loginService) {
        this.result = "";
        this.login=function(user)
        {
            loginService.login(user, this);
        }
    });

    app.factory("loginService", function($http, $location, sessionService) {
        return{
            login:function(user, parentController){
                var $promise = $http.post("api/login.json", user);
                $promise.then(function(msg){
                    console.log(msg.data);
                    if(msg.data.UserLevel != -1) 
                    {
                        sessionService.set('user', msg.data.Username);
                        sessionService.set('uid', msg.data.uid);
                        sessionService.set('userlevel', msg.data.UserLevel);
                        parentController.result = "Success";
                    }
                    else 
                    {                
                        $location.path('/overview');
                        parentController.result = "Fail";
                    }
                });
            },
            
            logout:function(){
                sessionService.destroy('user');
                sessionService.destroy('uid');
                sessionService.destroy('userlevel');
                $location.path('/overview');
            },
            isLoggedIn:function(){
                var $checkSession = $http.post("sessions/session_check.php")
                return $checkSession;            
            }
        }
    });
    
    app.factory("sessionService", ["$http", function($http){
    
        return {
            set:function(key, value)
            {
                return sessionStorage.setItem(key, value);
            },
            get:function(key)
            {
                return sessionStorage.getItem(key);
            },
            destroy:function(key)
            {
                $http.post("sessions/session_destroy.php");
                return sessionStorage.removeItem(key);
            }        
        }
    }]);
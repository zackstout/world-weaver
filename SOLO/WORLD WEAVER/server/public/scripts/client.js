
var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

var x, y, h, w;
/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
  .when('/home', {
    templateUrl: '/views/templates/home.html',
    controller: 'LoginController as lc',
  })
  .when('/register', {
    templateUrl: '/views/templates/register.html',
    controller: 'LoginController as lc'
  })
  .when('/user', {
    templateUrl: '/views/templates/user.html',
    controller: 'UserController as uc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/info', {
    templateUrl: '/views/templates/info.html',
    controller: 'InfoController as ic',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/play', {
    templateUrl: '/views/templates/play.html',
    controller: 'PlayController as pc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/all', {
    templateUrl: '/views/templates/all.html',
    controller: 'AllController as ac',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/game', {
    templateUrl: '/views/templates/game.html',
    controller: 'GameController as gc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/favs', {
    templateUrl: '/views/templates/favs.html',
    controller: 'FavController as fc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/myworlds', {
    templateUrl: '/views/templates/myworlds.html',
    controller: 'MyController as mc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/saved_games', {
    templateUrl: '/views/templates/saved_games.html',
    controller: 'SavedController as sc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/playing', {
    templateUrl: '/views/templates/playing.html',
    controller: 'PlayingController as pc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/edit', {
    templateUrl: '/views/templates/edit.html',
    controller: 'EditController as ec',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .otherwise({
    redirectTo: 'home'
  });
  // WorldService.getWorld();
});


//OK ALSO WANT TO:

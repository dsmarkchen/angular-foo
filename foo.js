var foo_app = angular.module('fooApp', []);
foo_app.controller('fooCtrl', function($scope, $http) {
  $scope.myWelcome = "";
  $scope.myGuideToStartL1="$mpm install -g local-web-server";
  $scope.myGuideToStartL2="$ws";
  
  $scope.cars = [
  {model : "Ford Mustang", color : "red"},
  {model : "Fiat 500", color : "white"},
  {model : "Volvo XC90", color : "black"}
 ];
  $scope.addCar= function () {
    var car = {model: $scope.addModel, 
    color: $scope.addColor};
    $scope.cars.push(car);  
  };
    
  $http({
    method : "GET",
      url : "welcome.htm"
  }).then(function mySuccess(response) {
    $scope.myWelcome = response.data;
  }, function myError(response) {
    $scope.myWelcome = response.statusText;
  });

  $http.get("customers.php").then(function (response) {
      $scope.myData = response.data.records;
  });

});


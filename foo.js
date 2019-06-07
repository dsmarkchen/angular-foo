var app = angular.module('fooApp', []);
app.controller('fooCtrl', function($scope, $http) {
    
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
});


var app = angular.module('cardsApp', []);
app.controller('cardsCtrl', function($scope) {
  $scope.oneAtATime = true;

  $scope.cards= [
    {
      ref: "a",
      title: "tada",
      content: "tada content"
    },
    {
      ref: "b",
      title: "tada tada",
      content: "some other content"
    }
  ];

  $scope.items = ['Camera 1', 'Camera 2', 'Camera 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Camera ' + newItemNo);
  };
});

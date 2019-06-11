var foo_app = angular.module('fooApp', []);
foo_app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    // We must whitelist the JSONP endpoint that we are using to show that we trust it
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://localhost:53818/**'
    ]);
  }])
 foo_app.controller('fooCtrl', function($scope, $http, $sce) {
  $scope.myWelcome = "";
  $scope.myGuideToStartL1="$mpm install -g local-web-server";
  $scope.myGuideToStartL2="$ws";
//  getallData();

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

 
  $scope.addFoo = function () {
        var data = {id: 0, name: $scope.addFooName, height: $scope.addFooHeight};

        var urlpost = "http://localhost:53818/api/foo"

        $http.post(urlpost, JSON.stringify(data))
            .then(function (response) {
                console.log( ">>>> " + response);

            if (response.data) 

                $scope.msg = "Post Data Submitted Successfully!";

            }, function (response) {

                $scope.msg = "Service not Exists";

                $scope.statusval = response.status;

                $scope.statustext = response.statusText;

                $scope.headers = response.headers();
            }); 
            
    } ; 
  
//  fetch();
//  getone(1);

//    console.log("begin");
    function getposts() {
        var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts"
        url = $sce.trustAsResourceUrl(url);
        $http.jsonp(url, {jsonpCallbackParam: 'callback'})
            .then(function(data){
                console.log( ">>>> " +data.found);
               $scope.posts = data.found
            }); 
       
        /*
        var url2 = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/post?callback=JSONP_CALLBACK";

        $http.jsonp(url2)
            .then(function onSuccess(data){
                console.log(">>>>  " +  "found: " + data.found);
            }); 
        */
    }

      $scope.fetch = function() {
        var url2 = "http://localhost:53818/api/foo"
        var trustedUrl2 = $sce.trustAsResourceUrl(url2);
 
   
        $http.get(trustedUrl2, {jsonpCallbackParam: 'callback'})
            .then(function(rsp){
                console.log(">>>>   " + trustedUrl2);
                console.log(">>>>   " + "status:" + rsp.status + "statusText: " + rsp.statusText + "data: " + rsp.data);
                $scope.ListFoo = rsp.data;
            }, function (error) {
                console.log("####   " + trustedUrl2);
                console.log("####   " + error);
            });
     }

    function getone(id) {
        var url2 = "http://localhost:53818/api/foo/" + id
        var trustedUrl2 = $sce.trustAsResourceUrl(url2);
 
   
        $http.get(trustedUrl2, {jsonpCallbackParam: 'callback'})
            .then(function(rsp){
                console.log(">>>>   " + trustedUrl2);
                console.log(">>>>   " + "status:" + rsp.status + "statusText: " + rsp.statusText + "data: " + rsp.data);
                $scope.Foo = rsp.data;
            }, function (error) {
                console.log("####   " + trustedUrl2);
                console.log("####   " +error);
            });
     }


    
 // $http({
 //   method : "GET",
 //     url : "welcome.htm"
 // }).then(function mySuccess(response) {
 //   $scope.myWelcome = response.data;
 // }, function myError(response) {
 //   $scope.myWelcome = response.statusText;
 // });

  $http({
//    method : "GET",
//      url : "http://localhost:8000/cars.html"
    method : "JSONP",
      url : "http://localhost:61217/api/gamma"
  }).then(function mySuccess(response) {
    $scope.myWelcome = response.data;
  }, function myError(response) {
    $scope.myWelcome = response.statusText;
  });


  $http.get("customers.php").then(function (response) {
      $scope.myData = response.data.records;
  });

});


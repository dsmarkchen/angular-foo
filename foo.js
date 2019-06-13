var foo_app = angular.module('fooApp', []);
foo_app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    // We must whitelist the JSONP endpoint that we are using to show that we trust it
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://localhost:53818/**'
    ]);
  }])
foo_app.controller('fooCtrl', function($scope, $http, $sce, $timeout) {

  $scope.status= "start...";
  $scope.loading = false;

  $scope.myWelcome = "Welcome to foo";

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


  // function: post a new record 
  $scope.add = function () {
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
  
    // function: get all
      $scope.fetch = function() {

        $scope.status= "fetching data";
        var url2 = "http://localhost:53818/api/foo"
        var trustedUrl2 = $sce.trustAsResourceUrl(url2);
        
        $scope.loading = true;
 
        $http.get(trustedUrl2, {jsonpCallbackParam: 'callback'})
            .then(function(rsp){
                console.log(">>>>   " + trustedUrl2);
                console.log(">>>>   " + "status:" + rsp.status + "statusText: " + rsp.statusText + "data: " + rsp.data);
                $scope.ListFoo = rsp.data;
                $scope.loading = false;
                $scope.status = "done";
            }, function (error) {
                console.log("####   " + trustedUrl2);
                console.log("####   " + error);
                $scope.loading = false;
                $scope.status  = "error";
            });
     }


     // function: get one
      $scope.getone =  function (id) {
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

     $scope.select = function(x) {
        console.log("select:" + x.id +  " " + x.name + " " + x.height);
        $scope.updateFooName = x.name;
        $scope.updateFooHeight = x.height;
        $scope.updateFooDateTime= x.dateTime;
        $scope.selectFooId = x.id;
        console.log("select:" + $scope.selectFooId );
     }

        // function: update 
     $scope.update = function() {
      
        var data = {name: $scope.updateFooName, height: $scope.updateFooHeight, dateTime: $scope.updateFooDateTime};

        var urlput = "http://localhost:53818/api/foo/" + $scope.selectFooId;
        console.log($scope.selectFooId);
        console.log(data);
        $http.put(urlput, JSON.stringify(data))
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
     }
     $scope.delete = function() {
      
        var data = {name: $scope.updateFooName, height: $scope.updateFooHeight};

        var urlput = "http://localhost:53818/api/foo/" + $scope.selectFooId;
        console.log($scope.selectFooId);
        console.log(data);
        $http.delete(urlput, JSON.stringify(data))
            .then(function (response) {
                console.log( ">>>> " + response);

            if (response.data) 

                $scope.msg = "delete successfully!";

            }, function (response) {

                $scope.msg = "Service not Exists";

                $scope.statusval = response.status;

                $scope.statustext = response.statusText;

                $scope.headers = response.headers();
            }); 
     }
    
  $http({
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

  $scope.sleep = function (milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
  }

  console.log("loading");
  $scope.loading = true;
  $scope.sleep(50000000);   
  $scope.fetch();


});


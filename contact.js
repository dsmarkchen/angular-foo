var app = angular.module('contactUsApp',[]);

app.controller("contactUsCtrl",function($scope, $http, $sce, $filter){
	$scope.submitForm = function(isValid) {
		this.formInput = {
            name: $("input[name='name']").val(),
            email: $("input[name='email']").val(),
            message: $("textarea[name='message']").val()
        };
		if (isValid) {
			console.log('Message sent successfully');
			console.log(this.formInput);
            $scope.add();
		} else {
			console.log('Failed to send message')
		}
	};




   $scope.add = function () {
        var data = {id: 0, 
            name: $scope.formInput.name, 
            email: $scope.formInput.email, 
            message: $scope.formInput.message,
            datetime: $filter('date')(Date.now(), "dd-MMM-yyyy HH:mm:ss")
        };

        var urlpost = "http://localhost:53818/api/contact"
        var trustedUrl = $sce.trustAsResourceUrl(urlpost);

        $http.post(trustedUrl, JSON.stringify(data))
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


    $scope.fetch = function() {

        $scope.status= "fetching data";
        var url2 = "http://localhost:53818/api/contact"
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



});

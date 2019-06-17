var app = angular.module('tetrisApp',[]);

app.controller("tetrisCtrl",function($scope){

    $scope.data = [];
    $scope.rows = 8;
    $scope.cols = 8;


    $scope.buildBoard  = function() {
      for(var row = 0; row < $scope.rows; row++) {
        var theRow = []
        for(var col = 0; col < $scope.cols; col++) {
            var elem = {"row": String.fromCharCode(65 + row), "col": String.fromCharCode(48 + col), "color":"default"};
            theRow.push(elem);
        }
        $scope.data.push(theRow);

      }
    }

    $scope.updateOneElement = function (elem1) {     
        var row1 = elem1.row.charCodeAt(0) - 65;
        var col1 = elem1.col.charCodeAt(0) - 48;
        console.log(">>>> " + row1 + " " + col1)
        for(var row = 0; row < $scope.rows; row++) {

        var theRow =  $scope.data[row];
        if(row != row1) continue;
        for(var col = 0; col <= $scope.cols; col++) {
            
            var x = theRow[col];
            if(col == col1 && row == row1) {
                if(x.color != elem1.color) {
                    $scope.data[row][col].color = elem1.color;
                    break;
                }    
            }
        }

      }
   }

   $scope.GetSq = function() {
       var dataSq = [];
       var elem1 = {"row" : String.fromCharCode (65) ,  "col": String.fromCharCode(48 + 3), "color":"red"};
       var elem2 = {"row" : String.fromCharCode (65) ,  "col": String.fromCharCode(48 + 4), "color":"red"};
       var elem3 = {"row" : String.fromCharCode (66) ,  "col": String.fromCharCode(48 + 3), "color":"red"};
       var elem4 = {"row" : String.fromCharCode (66) ,  "col": String.fromCharCode(48 + 4), "color":"red"};
       
       dataSq.push(elem1);
       dataSq.push(elem2);
       dataSq.push(elem3);
       dataSq.push(elem4);
       return dataSq;
    }

    $scope.buildBoard();
       
    var dataSq = $scope.GetSq(); 
    var len = dataSq.length;
    for (var i = 0; i < len; i++) {
        $scope.updateOneElement(dataSq[i]);
    }

        
   

});
	

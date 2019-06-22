var app = angular.module('tetrisApp',[]);

app.controller("tetrisCtrl",function($scope, $timeout, $filter){

    $scope.data = [];
    $scope.ending = [];
    $scope.cols = 8;

    $scope.startRow = 'A';
    $scope.lastRow = 'H';
    $scope.rows = $scope.lastRow.charCodeAt(0)  - $scope.startRow.charCodeAt(0) + 1

    $scope.buildBoard  = function() {
      for(var row = 0; row < $scope.rows; row++) {
        var theRow = []
        for(var col = 0; col < $scope.cols; col++) {
            var elem = {"row": String.fromCharCode(65 + row), "col": String.fromCharCode(48 + col), "color":"default"};
            theRow.push(elem);
        }
        $scope.data.push(theRow);

      }
      for(var col = 0; col < $scope.cols; col++) {
            var elem = {"row": $scope.lastRow, "col": String.fromCharCode(48 + col) };
            $scope.ending.push(elem);
      }
     
    };

    $scope.updateEnding = function() {
        //console.log(">>>> " + row1 + " " + col1)
       for(var col = 0; col < $scope.cols; col++) {
            for(var row = 0; row < $scope.rows; row++) {

             var theRow =  $scope.data[row];
             if(theRow[col].color != "default") {
                 $scope.ending[col].row = theRow[col].row;
                 break;    
             }
            }
        }
        
    }

    $scope.updateOneElement = function (elem1) {     
        var row1 = elem1.row.charCodeAt(0) - 65;
        var col1 = elem1.col.charCodeAt(0) - 48;
        //console.log(">>>> " + row1 + " " + col1)
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

   $scope.checkOneElement = function (elem1) {
        var row1 = elem1.row.charCodeAt(0) - 65;
        var col1 = elem1.col.charCodeAt(0) - 48;
        
        for(var row = 0; row < $scope.rows; row++) {

            var theRow =  $scope.data[row];
            if(row != row1) continue;
            for(var col = 0; col <= $scope.cols; col++) {
            
                var x = theRow[col];
                if(col == col1 && row == row1) {
                    if(x.color != "default") {
                        return false;
                    }    
                 }
           }

       }
       return true;
    }

   // rowKey (65) colKey (48)
   $scope.GetSq = function(rowKey, colKey, color) {
       var dataSq = [];

       var elem1 = {"row" : String.fromCharCode (rowKey) ,  "col": String.fromCharCode(colKey), "color":color};
       var elem2 = {"row" : String.fromCharCode (rowKey) ,  "col": String.fromCharCode(colKey + 1), "color":color};
       var elem3 = {"row" : String.fromCharCode (rowKey+1) ,  "col": String.fromCharCode(colKey), "color": color};
       var elem4 = {"row" : String.fromCharCode (rowKey+1) ,  "col": String.fromCharCode(colKey + 1), "color":color};
       
       dataSq.push(elem1);
       dataSq.push(elem2);
       dataSq.push(elem3);
       dataSq.push(elem4);
       return dataSq;
    }

    $scope.counter = 65;
    $scope.pos = 48;
    $scope.color = "blue";
    $scope.onTimeout = function(){
       var counter =  $scope.counter++;
       var pos = $scope.pos;
       var color = $scope.color;
       var needNewOne = false;

       var dataSq = $scope.GetSq(counter, pos, color);
       var len = dataSq.length;
       for(var i=0;i < len; i++ ) {
           var lrow = $filter('filter')($scope.ending, {'col':dataSq[i].col})[0];
           console.log( dataSq[i].row + "__" +dataSq[i].col + "" + lrow.row);
           var color2 = $scope.data[dataSq[i].row.charCodeAt(0) - 65 + 1][lrow.col.charCodeAt(0) - 48].color;
           if(dataSq[i].row.charCodeAt(0) + 1 == lrow.row.charCodeAt(0)) {
                if(color2 != "default") {
                needNewOne = true;
                $scope.updateEnding();
                break;
                }
            } 
        }

        if(needNewOne) {
           $scope.counter = 65;
            $scope.pos += 1;
            $scope.color = "orange";
            mytimeout = $timeout($scope.onTimeout,1000);
            return;

        }
       
       if(dataSq[0].row.charCodeAt(0) + 1 >= $scope.lastRow.charCodeAt(0)) {
            // $timeout.cancel(mytimeout);
            $scope.counter = 65;
            $scope.pos += 1;
            $scope.color = "orange";
            mytimeout = $timeout($scope.onTimeout,1000);
            return;
        }     

       var dataSq2 = $scope.GetSq(counter , pos, "default"); 
       var dataSq3 = $scope.GetSq(counter+1, pos, color); 


       var len = dataSq.length;
       for (var i = 0; i < len; i++) {
         $scope.updateOneElement(dataSq[i]);
       }

       len = dataSq2.length;
       for (var i = 0; i < len; i++) {
           $scope.updateOneElement(dataSq2[i]);
       }


        len = dataSq3.length;
        for (var i = 0; i < len; i++) {
          $scope.updateOneElement(dataSq3[i]);
        }

        if(counter < $scope.lastRow.charCodeAt(0))
            mytimeout = $timeout($scope.onTimeout,1000);
        else 
            $timeout.cancel(mytimeout);
    }
    $scope.buildBoard();
    var mytimeout = $timeout($scope.onTimeout,1000);  
    
   

});
	

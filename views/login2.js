    /// <reference path = "/Users/tarunbidaliya/Downloads/angular-1.6.0/angular.min.js"/>


// var myApp = angular.module("form2App",[]);




var isFound = false;

myApp.controller("loginController", function ($scope, $location, $rootScope) {

    $scope.submit = ()=>{
        let usernameEmail = $scope.login.nameEmail;
        let password = $scope.login.password;

        console.log(usernameEmail);
        console.log(password);
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        
        users.forEach(user => {
            if((user.name === usernameEmail || user.email === usernameEmail) && user.pass === password){
                isFound = true
                alert(`Hello name = ${user.name} email = ${user.email}`);
                $rootScope.isLoggedIn = true;
                $rootScope.loggedInUsername = user.name;
                window.localStorage.setItem("isLoggedIn", $rootScope.isLoggedIn);
                window.localStorage.setItem("loggedInUsername", $rootScope.loggedInUsername);
                gotoHome()
            }
        });
        if(!isFound){
            $rootScope.isLoggedIn = false;
            localStorage.setItem("isLoggedIn", $rootScope.isLoggedIn);
            alert("No User Found");
            console.log("user not found");
            // $scope.login.nameEmail = "";
            // $scope.login.password = "";
            gotoLogin()
        }

        // const txn = db.transaction('Users', 'readonly');
        // const store = txn.objectStore('User');
        // const index = store.index('email');
        // let query = index.get(usernameEmail);

    }
    var gotoLogin = ()=>{
      $location.path('/signUp2')
      console.log("clicked");
    }
    
    var gotoHome = ()=>{
      $location.path('/home')
    }

});

function getContactByEmail(db, email) {
    const txn = db.transaction('Contacts', 'readonly');
    const store = txn.objectStore('Contacts');

    // get the index from the Object Store
    const index = store.index('email');
    // query by indexes
    let query = index.get(email);

    // return the result object on success
    query.onsuccess = (event) => {
        console.table(query.result); // result objects
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    // close the database connection
    txn.oncomplete = function () {
        db.close();
    };
}

// myApp.directive('nameDirective', function() {
//     return {
//       require: 'ngModel',
//       link: function(scope, element, attr, mCtrl) {
//         function myValidation(value) {
//           if (value.length > 3) {
//             console.log(` length > 3 ${value}`);
//             mCtrl.$setValidity('', true);
//           } else {
//             console.log(`length < 3 ${value}`);
//             mCtrl.$setValidity('', false);
//           }
//           return value;
//         }
//         mCtrl.$parsers.push(myValidation);
//       }
//     };
//   });

  // myApp.directive('passDirective', function() {
  //   return {
  //     require: 'ngModel',
  //     link: function(scope, element, attr, mCtrl) {
  //       function myValidation(value) {
  //         if (passwordPattern.test(value)) {
  //           //console.log(mCtrl)
  //           //console.log(`length less than 10 ${value}`);
  //           mCtrl.$setValidity('', true);
  //         } else {
  //           //console.log(`length is correct ${value}`);
  //           mCtrl.$setValidity('', false);
  //         }
  //         return value;
  //       }
  //       mCtrl.$parsers.push(myValidation);
  //     }
  //   };
  // });
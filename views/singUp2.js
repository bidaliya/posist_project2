    /// <reference path = "/Users/tarunbidaliya/Downloads/angular-1.6.0/angular.min.js"/>

const emailPattern = /^[A-Za-z._]{3,}@[A_Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

let db;

const request = indexedDB.open('CRM', 1);
      request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
      };
    
      request.onsuccess = (event) => {
        // add implementation here
        db = event.target.result;
      };

      request.onupgradeneeded = (event) => {
        const database = event.target.result;
        let store = database.createObjectStore('Users', {
            autoIncrement: true
        });
  
          // create an index on the email property
        let NameIndex = store.createIndex('name', 'name', {
          unique: false
        });
        let EmailIndex = store.createIndex('email', 'email', {
          unique: true
        });
        let PhoneIndex = store.createIndex('phone', 'phone', {
          unique: true
        });
        let PassIndex = store.createIndex('password', 'password', {
          unique: false
        });

        console.log("Db is created");
      
    };
// password should have

// var myApp = angular.module("form2App",['ngRoute']);

function insertUser(user){
  const txn = db.transaction('Users', 'readwrite'); // txn = transaction

    // get the Contacts object store
    const store = txn.objectStore('Users'); // The 1st parameter is the name of the table inside the IndexDb
    //
    let query = store.add(user);

    // handle success case
    query.onsuccess = function (event) {
        console.log(event);
    };

    // handle the error case
    query.onerror = function (event) {
        console.log(event.target.errorCode);
    }

    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}

myApp.controller("signUpController", function ($scope, $location) {
    // $scope.signup
    $scope.submit = ()=>{
      // get the username
      let username = $scope.signup.name;
      let email = $scope.signup.email;
      let phone = $scope.signup.phone;
      let password = $scope.signup.password;
      let cpassword = $scope.signup.cpassword;

      const user = {
          name:  username,
          email: email, 
          phone: phone,
          pass:  password,
      }
      // var users = JSON.parse(localStorage.getItem("users") || "[]");
      // users.push({
      //     name:  username,
      //     email: email, 
      //     phone: phone,
      //     pass:  password,
      //     cpass: cpassword
      //   })
      // localStorage.setItem("users", JSON.stringify(users));

      insertUser(user);
      //console.log("No. of users: " + users.length);
      alert(`${username} is successfully registered`)
      $location.path('/login2')
    }

    $scope.gotoLogin = ()=>{
      $location.path('/login2')
      console.log("clicked");
    }
});

// username error message validity ( custm directive )

myApp.directive('nameDirective', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, mCtrl) {
        function myValidation(value) {
          if (value.length > 3) {
            console.log(` length > 3 ${value}`);
            mCtrl.$setValidity('', true);
          } else {
            console.log(`length < 3 ${value}`);
            mCtrl.$setValidity('', false);
          }
          return value;
        }
        mCtrl.$parsers.push(myValidation);
      }
    };
  });

  // myApp.directive('yourDirective', function() {
  //   return {
  //     require: 'ngModel',
  //     link: function(scope, element, attr, mCtrl) {
  //       function myValidation(value) {
  //         if (value.trim.length<3) {
  //           console.log("length < 3");
  //           mCtrl.$setValidity('', true);
  //         } else {
  //           console.log("length > 3");
  //           mCtrl.$setValidity('', false);
  //         }
  //         return value;
  //       }
  //       mCtrl.$parsers.push(myValidation);
  //     }
  //   };
  // });

  myApp.directive('phoneDirective', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, mCtrl) {
        function myValidation(value) {
          if (value.length != 10) {
            console.log(mCtrl)
            console.log(`length less than 10 ${value}`);
            mCtrl.$setValidity('', false);
          } else {
            console.log(`length is correct ${value}`);
            mCtrl.$setValidity('', true);
          }
          return value;
        }
        mCtrl.$parsers.push(myValidation);
      }
    };
  });

  myApp.directive('passDirective', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, mCtrl) {
        function myValidation(value) {
          if (passwordPattern.test(value)) {
            //console.log(mCtrl)
            //console.log(`length less than 10 ${value}`);
            mCtrl.$setValidity('', true);
          } else {
            //console.log(`length is correct ${value}`);
            mCtrl.$setValidity('', false);
          }
          return value;
        }
        mCtrl.$parsers.push(myValidation);
      }
    };
  });

  myApp.directive('cpasswordDirective', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attr, mCtrl) {
        function myValidation(value) {
          if (value != scope.signup.password) {
            console.log(`not same`);
            mCtrl.$setValidity('', false);
          } else {
            console.log(`password is same`);
            mCtrl.$setValidity('', true);
          }
          return value;
        }
        mCtrl.$parsers.push(myValidation);
      }
    };
  });

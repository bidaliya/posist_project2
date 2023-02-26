
  myApp.controller("homeController",  function ($scope, $http, $rootScope, $location) {
    
    // $scope.selectedOption = 'select';
    console.log($scope.selectedOption);
    $scope.typesOfNews = [
      {
        category:'business',
        url:'https://saurav.tech/NewsAPI/top-headlines/category/business/in.json'
      },
      {
        category:'entertainment',
        url:'https://saurav.tech/NewsAPI/top-headlines/category/entertainment/in.json'
      },
      {
        category:'general',
        url:'https://saurav.tech/NewsAPI/top-headlines/category/general/in.json'
      },
      {
        category:'health',
        url:'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json'
      },
      {
        category:'science',
        url:'https://saurav.tech/NewsAPI/top-headlines/category/science/in.json'
      },
      {
        category:'sports',
        url:'https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json'
      },
      {
        category:'technology',
        url:'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json'
      }
    ];

    
    $http({
      method: 'GET',
      url: 'https://saurav.tech/NewsAPI/top-headlines/category/'+$scope.typesOfNews[4].category+'/in.json'
      }).then(function successCallback(response) {
      // ng-click, ng-class
      $scope.responseData = response.data.articles;

      console.log(response.data.articles)
      }, function errorCallback(response) {
        console.log(response);
      });

      $rootScope.loggedInUsername = window.localStorage.getItem("loggedInUsername");
      $rootScope.isLoggedIn = window.localStorage.getItem("isLoggedIn");

      $scope.width = "0px";
      $scope.marginLeft = "0";
      
      $scope.openNav = ()=>{
        $scope.width ="250px";
        $scope.marginLeft = "250px";
        
      }
      $scope.closeNav = ()=>{
        $scope.width ="0px";
        $scope.marginLeft = "0px";
      }

      $scope.logout = ()=>{
        window.localStorage.setItem("isLoggedIn", false);
        window.localStorage.setItem("loggedInUsername", "");
        $location.path('/login2');
      }

      //$scope.singleSelect = singleSelect;

  });

  /* Create factory to Disable Browser Back Button only after Logout */
	myApp.factory("checkAuth", function($location,$rootScope){
    return {
    getuserInfo : function(){
      if($rootScope.isLoggedIn === undefined || $rootScope.isLoggedIn === null){
        $location.path('/login2');
      }
      else{
        
      }
    }
    };
});
  
//   function openNav() {
//     document.getElementById("mySidebar").style.width = "250px";
//     document.getElementById("main").style.marginLeft = "250px";
//   }
  
//   function closeNav() {
//     document.getElementById("mySidebar").style.width = "0";
//     document.getElementById("main").style.marginLeft= "0";
//   }

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '6e0248e9f0mshf293eee9aab75d5p18fa11jsnb0522679c521',
// 		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
// 	}
// };

// const exerciseWebsite = new Map([
//     ["waist", "https://www.womenshealthmag.com/uk/fitness/strength-training/g34022750/exercises-waist/"],

//     ["back", "https://www.bodybuilding.com/content/10-best-muscle-building-back-exercises.html"],

//     ["chest", "https://www.bodybuilding.com/content/10-best-chest-exercises-for-building-muscle.html"],

//     ["lowerarms", "https://www.healthline.com/health/forearm-exercises"],

//     ["lowerlegs", "https://www.mensjournal.com/health-fitness/build-calf-muscles-with-these-15-exercises/"],

//     ["neck", "https://universityorthopedics.com/educational_resources/neck_exercises.html"],

//     ["shoulders", "https://www.mensjournal.com/health-fitness/best-shoulder-exercises-of-all-time/"],

//     ["upperarms", "https://www.womenshealthmag.com/fitness/a20702885/arm-toning-exercises/"],

//     ["upperlegs", "https://www.womenshealthmag.com/uk/fitness/strength-training/g35873537/best-inner-thigh-exercises/" ],

//     ["cardio", "https://www.medicalnewstoday.com/articles/cardio-exercises-at-home"]
// ])

// fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', options)
// 	.then(response => response.json())
// 	.then(data => {
//         var dynamic = document.querySelector('.cardcontainer'); 
//         for(x in data){
//             console.log(data[x]);
//             var fetch = document.querySelector('.cardcontainer').innerHTML;  
//             dynamic.innerHTML = `<div class="card">
//                 <div class="card-image" id = "${data[x].replace(/\s+/g, '')}"></div>
//                 <h2>${data[x].toUpperCase()}</h2>
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet repellendus, illum illo voluptatem dolores iste molestias officiis quos esse doloremque quod, suscipit alias.</p>
//                 <div class="read-more" id = "${data[x]}">
//                     <button onclick="window.open('${exerciseWebsite.get(data[x].replace(/\s+/g, ''))}','_blank')">Read More</button>
//                     <i class="fa-solid fa-arrow-right homei"></i>
//                 </div>
//             </div>` + fetch ; 
            
//             var bgImg = document.getElementById(`${data[x].replace(/\s+/g, '')}`)
//             bgImg.style.backgroundImage = `url(/Project1/Exercise_Pics/${data[x].replace(/\s+/g, '')}.gif)`
//             bgImg.style.height = `200px`
//             bgImg.style.marginBottom = `15px`
//             bgImg.style.backgroundSize = `cover`
//             bgImg.style.borderRadius = `15px 15px 0 0`


            
//         }
//     })
// 	.catch(err => console.error(err));


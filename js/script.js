//https://covid19.mathdro.id/api
//https://covid19.mathdro.id/api/countries/india
const URL = "https://covid19.mathdro.id/api";

let app = angular.module('MyApp', []);
app.controller('MyCtrl', ($scope, $http) => {
    $scope.title = "stay home stay safe";
    $http.get(URL).then((response) => {
        $scope.allData = response.data;
    },
        (error) => {
            console.log(error);
        }
    );
        //get countries data
        $scope.getCountData= () => {
            let country= $scope.CountryName;
            if(country == ''){
                $scope.countryData=undefined;
                return;
            }
            
            $http.get(`${URL}/countries/${country}`)
            .then( (response) => {
                $scope.countryData= response.data;
            } , 
            (error)=>{
                console.log(error);
            } )
        }
});
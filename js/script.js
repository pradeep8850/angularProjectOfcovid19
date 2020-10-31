//https://covid19.mathdro.id/api
//https://covid19.mathdro.id/api/countries/india
const URL = "https://covid19.mathdro.id/api";
const indiaStateURL = "https://api.covidindiatracker.com/state_data.json";
var allStateName = []; //state
var allActiveCaseInState = []; //active
var allConfirmedCaseInState = []; //confirmed 
var allRecoveredCasesInState = []; //recovered 
var allDeathCaseInState = []; //deaths

let app = angular.module('MyApp', []);
app.controller('MyCtrl', ($scope, $http) => {
    $scope.title = "Stay-at-home";
    $scope.today = new Date();
    $http.get(URL).then((response) => {
        $scope.allData = response.data;
    },
        (error) => {
            console.log(error);
        }
    );
    //get countries data
    $scope.getCountData = () => {
        let country = $scope.CountryName;
        if (country == '') {
            $scope.countryData = undefined;
            return;
        }

        $http.get(`${URL}/countries/${country}`)
            .then((response) => {
                $scope.countryData = response.data;
            },
                (error) => {
                    console.log(error);
                })
    }

    $http.get(indiaStateURL).then((response) => {
        let allResponseData = response.data;
        for (let i = 0; i < allResponseData.length; i++) {
            allStateName.push(response.data[i].state);
            allActiveCaseInState.push(response.data[i].active);
            allConfirmedCaseInState.push(response.data[i].confirmed);
            allRecoveredCasesInState.push(response.data[i].recovered);
            allDeathCaseInState.push(response.data[i].deaths);
        }
        $scope.state =allStateName;
        $scope.active =allActiveCaseInState;
        $scope.confirmed = allConfirmedCaseInState;
        $scope.recover = allRecoveredCasesInState;
        $scope.death = allDeathCaseInState;
        for (let i = 0; i < allResponseData.length; i++) {
            console.log(`state name is ${allStateName[i]}, active case is ${allActiveCaseInState[i]}, Confirmed Case is ${allConfirmedCaseInState[i]}, Recovered Cases is ${allRecoveredCasesInState[i]}, Death Case ${allDeathCaseInState[i]}`);
        }
    },
        (error) => {
            console.log(error);
        }
    );
    $scope.getStateData = () => {
        let state = $scope.stateName;
        if (state == '') {
            $scope.stateData = undefined;
            return;
        }
        $http.get(`${indiaStateURL}`)
    }
});
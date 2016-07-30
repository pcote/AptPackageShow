var apsSearchResults = function(){
    var d = {};
    d.restrict = "E";
    d.scope = {
        results: "="
    };

    d.templateUrl = "searchresults/searchresults.html";
    d.controller = "searchResultsController";
    d.controllerAs = "src";
    return d;
};

var searchResultsController = function($scope){
    var src = this;
    src.packageList = [];

    // Watch set up for changes in the package list that comes up.
    var resVal = function(){
        return $scope.results;
    };

    var resListener = function(newVal, oldVal){
        src.packageList = $scope.results;
    };

    $scope.$watch(resVal, resListener);
};

angular.module("searchresults", [])
    .controller("searchResultsController", searchResultsController)
    .directive("apsSearchResults", apsSearchResults);
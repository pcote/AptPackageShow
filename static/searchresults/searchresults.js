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


var SearchResultsService = function($http){

    this.getPackageDetail = function(packageName){
        var someUrl = "/packageinfo/" + escape(packageName);
        var promise = $http.get(someUrl);
        return promise;
    };
};


var searchResultsController = function($scope, searchResultsService){
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


    src.packageClick = function(pkgName){

        var successCallback = function(res){
            var packageInfo = res.data.package_info;
            console.log(packageInfo);
        };

        var promise = searchResultsService.getPackageDetail(pkgName);
        promise.then(successCallback);
    };
};


angular.module("searchresults", [])
    .service("searchResultsService", SearchResultsService)
    .controller("searchResultsController", searchResultsController)
    .directive("apsSearchResults", apsSearchResults);
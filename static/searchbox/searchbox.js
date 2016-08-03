var SearchBoxService = function($http){
    var sbs = this;

    sbs.doSearch = function(term){
        var escapedTerm = escape(term);
        var url = "/search/" + escapedTerm
        var promise = $http.get(url);
        return promise;
    };
};

var apsSearchBox = function(){
    var d = {};
    d.restrict = "E";

    d.scope = {
        results: "="
    };

    d.templateUrl = "searchbox/searchbox.html";
    d.controller = "searchBoxController";
    d.controllerAs = "sbc";
    return d;
};


var searchBoxController = function($scope, searchBoxService){
    var sbc = this;
    sbc.searchTerm = "";

    sbc.searchClick  = function(){
        var successCallback = function(res){
            var searchResults = res.data.search_results;
            $scope.results = searchResults;
        };
        var promise = searchBoxService.doSearch(sbc.searchTerm);
        promise.then(successCallback);
    };
};


angular.module("searchBox", [])
    .service("searchBoxService", SearchBoxService)
    .controller("searchBoxController", searchBoxController)
    .directive("apsSearchBox", apsSearchBox);

var apsSearchBox = function(){
    var d = {};
    d.restrict = "E";
    d.templateUrl = "searchbox/searchbox.html";
    d.controller = "searchBoxController";
    d.controllerAs = "sbc";
    return d;
};


var searchBoxController = function(searchBoxService){
    var sbc = this;
    sbc.searchTerm = "";

    sbc.searchClick  = function(){
        var successCallback = function(res){
            var searchResults = res.data.search_results;
            console.log(searchResults);
        };
        var promise = searchBoxService.doSearch(sbc.searchTerm);
        promise.then(successCallback);
    };
};


angular.module("searchBox", [])
    .service("searchBoxService", SearchBoxService)
    .controller("searchBoxController", searchBoxController)
    .directive("apsSearchBox", apsSearchBox);

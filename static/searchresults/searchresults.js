var apsSearchResults = function(){
    var d = {};
    d.restrict = "E";
    d.templateUrl = "searchresults/searchresults.html";
    return d;
};

angular.module("searchresults", [])
    .directive("apsSearchResults", apsSearchResults);
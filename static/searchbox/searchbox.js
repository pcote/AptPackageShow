var apsSearchBox = function(){
    var d = {};
    d.restrict = "E";
    d.templateUrl = "searchbox/searchbox.html";
    return d;
};

angular.module("searchBox", [])
    .directive("apsSearchBox", apsSearchBox);
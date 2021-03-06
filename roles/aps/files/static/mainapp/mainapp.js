var apsMainApp = function(){
    var d = {};
    d.restrict = "E";
    d.templateUrl = "mainapp/mainapp.html";
    d.controller = "mainController";
    d.controllerAs = "mc";
    return d;
};

var mainController = function(){
    var mc = this;
    mc.stubVar = "This is a stub from the controller";
    mc.searchResults = [];
};

angular.module("mainApp", ["searchBox", "searchresults"])
    .controller("mainController", mainController)
    .directive("apsMainApp", apsMainApp);

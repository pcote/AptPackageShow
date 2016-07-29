var apsMainApp = function(){
    var d = {};
    d.restrict = "E";
    d.templateUrl = "mainapp.html";
    d.controller = "mainController";
    d.controllerAs = "mc";
    return d;
};

var mainController = function(){
    var mc = this;
    mc.stubVar = "This is a stub from the controller";
};
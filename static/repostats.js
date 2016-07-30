var apsRepoStats = function(){
    var d = {};
    d.restrict = "E";
    d.templateUrl = "repostats.html";
    d.controller = "repoStatsController";
    d.controllerAs = "rsc";
    return d;
};

var repoStatsController = function(){
    var rsc = this;
    rsc.stats = [
        {name: "package", val: "blender"},
        {name: "version", val: "2.3"},
        {name: "description", val: "does stuff"}
    ];
};
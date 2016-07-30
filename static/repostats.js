var apsRepoStats = function(){
    var d = {};
    d.restrict = "E";
    d.templateUrl = "repostats.html";
    d.controller = "repoStatsController";
    d.controllerAs = "rsc";
    return d;
};


var repoStatsController = function(repoStatsService){
    var rsc = this;
    rsc.stats = [
        {name: "package", val: "blender"},
        {name: "version", val: "2.3"},
        {name: "description", val: "does stuff"}
    ];

    var successCallback = function(res){
        rsc.stats = res.data.stats;
    };

    var promise = repoStatsService.getStats();
    promise.then(successCallback);
};

var RepoStatsService = function($http){

    var svc = this;

    svc.getStats = function(){
        var promise = $http.get("/stats");
        return promise;
    };

};

var apsRepoStats = function(){
    var d = {};
    d.restrict = "E";
    d.templateUrl = "repostats/repostats.html";
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

angular.module("repoStats", [])
        .service("repoStatsService", RepoStatsService)
        .controller("repoStatsController", repoStatsController)
        .directive("apsRepoStats", apsRepoStats);

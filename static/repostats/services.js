var RepoStatsService = function($http){

    var svc = this;

    svc.getStats = function(){
        var promise = $http.get("/stats");
        return promise;
    };

};
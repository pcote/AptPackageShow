(function(){

    angular.module("app", [])
        .service("repoStatsService", RepoStatsService)
        .controller("mainController", mainController)
        .controller("repoStatsController", repoStatsController)
        .directive("apsRepoStats", apsRepoStats)
        .directive("apsMainApp", apsMainApp);
}())
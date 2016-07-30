(function(){

    angular.module("app", [])
        .controller("mainController", mainController)
        .controller("repoStatsController", repoStatsController)
        .directive("apsRepoStats", apsRepoStats)
        .directive("apsMainApp", apsMainApp);
}())
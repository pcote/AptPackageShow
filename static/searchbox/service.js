var SearchBoxService = function($http){
    var sbs = this;

    sbs.doSearch = function(term){
        var escapedTerm = escape(term);
        var url = "/search/" + escapedTerm
        var promise = $http.get(url);
        return promise;
    };
};
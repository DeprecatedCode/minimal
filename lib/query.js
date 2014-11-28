/**
 * M - Query
 * @author Nate Ferrero
 */
(function () {
    var query = this.M.query = function (_query) {
        return document.querySelectorAll(_query);
    };
    var queryFirst = query.first = function (_query) {
        return document.querySelector(_query);
    };
    var queryForEach = this.M.query.forEach = function (_query, fn) {
        return Array.prototype.forEach.call(document.querySelectorAll(_query), fn);
    };
    var queryMap = this.M.query.map = function (_query, fn) {
        return Array.prototype.map.call(document.querySelectorAll(_query), fn);
    };
    var queryExists = this.M.query.exists = function (_query) {
        return document.querySelector(_query) !== null;
    };
})();

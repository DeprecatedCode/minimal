(function () {
    this.M || (this.M = {});
    var ready = [];

    this.M.ready = function (fn) {
        ready.push(fn);
    };

    window.onload = function () {
        ready.forEach(function (fn) {
            fn();
        });
    };
})();

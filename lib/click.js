/**
 * M - Click
 * @author Nate Ferrero
 */
(function () {
    var click = this.M.click = function (el, fn) {
        'click'.split(' ').forEach(function (event) {
            el.addEventListener(event, function () {
                fn(el, event);
            });
        });
    };
})();

/**
 * M - Behavior
 * @author Nate Ferrero
 */
(function () {
    var behaviors = {};

    var behavior = this.M.behavior = function (name, el, fn) {
        behaviors[name] = function (evt) {
            fn(el, evt);
        };
        'change'.split(' ').forEach(function (event) {
            el.addEventListener(event, behaviors[name]);
        });
        behaviors[name]();
    };

    behavior.live = function (name, el, fn) {
        behaviors[name] = function (evt) {
            fn(el, evt);
        };
        'keydown keyup keypress change'.split(' ').forEach(function (event) {
            el.addEventListener(event, behaviors[name]);
        });
        behaviors[name]();
    };

    behavior.trigger = function (name) {
        behaviors[name]();
    };
})();

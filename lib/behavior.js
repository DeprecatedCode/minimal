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
        var timer;
        'change'.split(' ').forEach(function (event) {
            el.addEventListener(event, function () {
                clearTimeout(timer);
                timer = setTimeout(behaviors[name]);
            });
        });
        behaviors[name]();
    };

    behavior.live = function (name, el, fn) {
        behaviors[name] = function (evt) {
            fn(el, evt);
        };
        var timer;
        'keydown keyup keypress change'.split(' ').forEach(function (event) {
            el.addEventListener(event, function () {
                clearTimeout(timer);
                timer = setTimeout(behaviors[name]);
            });
        });
        behaviors[name]();
    };

    behavior.trigger = function (name) {
        behaviors[name]();
    };
})();

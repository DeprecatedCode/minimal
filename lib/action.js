/**
 * M - Action
 * @author Nate Ferrero
 */
(function () {
    var actions = {};
    var action = this.M.action = function (name, fn) {
        actions[name] = fn;
    };

    action.scan = function () {
        M.query.forEach('[data-action]', function (action) {
            if (!action._M_actionInitialized) {
                action._M_actionInitialized = true;
                M.click(action, function (event) {
                    actions[action.dataset.action](action.dataset, event);
                });
            }
        });
    };

    action.trigger = function (name, dataset) {
        actions[name](dataset);
    };
})();

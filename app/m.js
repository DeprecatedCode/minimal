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


/**
 * M - Device
 * @author Nate Ferrero
 */
(function () {
    var device = this.M.device = {
        Android: function() {
            return /Android/i.test(navigator.userAgent);
        },
        BlackBerry: function() {
            return /BlackBerry/i.test(navigator.userAgent);
        },
        iOS: function() {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
        Windows: function() {
            return /IEMobile/i.test(navigator.userAgent);
        },
        any: function() {
            return (device.Android() || device.BlackBerry() || device.iOS() || device.Windows());
        }
    };

    this.M.ready(function () {
        if (device.Android()) {
            document.body.classList.add('device-android');
        }

        else if (device.iOS()) {
            document.body.classList.add('device-ios');
        }

        else if (device.Windows()) {
            document.body.classList.add('device-windows');
        }

        else if (device.BlackBerry()) {
            document.body.classList.add('device-blackberry');
        }
    });
})();

/**
 * M - Id
 * @author Nate Ferrero
 */
(function () {
    var id = this.M.id = function (_id) {
        return document.getElementById(_id);
    };
})();

/**
 * M - Menu
 * @author Nate Ferrero
 */
(function () {
    var M = this.M;
    var menuConfig = {};

    var menu = this.M.menu = function (name, config) {
        if (config) {
            menuConfig[name] = config;
        }
    };

    menu.show = function (name) {
        /**
         * If the menu is already open, hide it
         */
        if (M.query.exists('[data-menu=' + name + '].active')) {
            name = null;
        }
        M.query.forEach('[data-menu]', function (menu) {
            M.switchClass(menu, ['active'], menu.dataset.menu === name ? 'active' : null);
        });
        M.query.forEach('[data-menu-button]', function (menuButton) {
            M.switchClass(menuButton, ['active'], menuButton.dataset.menuButton === name ? 'active' : null);
        });
    };

    menu.scan = function () {
        M.query.forEach('[data-menu-button]', function (menuButton) {
            if (!menuButton._M_menuButtonInitialized) {
                menuButton._M_menuButtonInitialized = true;
                M.click(menuButton, function () {
                    menu.show(menuButton.dataset.menuButton);
                });
            }
        });
    };
})();

/**
 * M - Modal
 * @author Nate Ferrero
 */
(function () {
    var modal = this.M.modal = function (config) {
        ;
    };
})();

/**
 * M - Query
 * @author Nate Ferrero
 */
(function () {
    var query = this.M.query = function (_query) {
        return document.querySelectorAll(_query);
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

/**
 * M - Switch Class
 * @author Nate Ferrero
 */
(function () {
    var switchClass = this.M.switchClass = function (el, choices, chosen, prefix) {
        prefix = prefix || '';
        choices.forEach(function (choice) {
            el.classList.remove(prefix + choice);
        });
        if (chosen) {
            el.classList.add(prefix + chosen);
        }
    };
})();

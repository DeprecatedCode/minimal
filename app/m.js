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
    var removeActiveTimer = {};
    var ANIMATION_DELAY = 300;

    var menu = this.M.menu = function (name, config) {
        if (config) {
            menuConfig[name] = config;
        }
    };

    menu.show = function (name) {
        /**
         * If the menu is already open, hide it
         */
        if (M.query.exists('[data-menu=' + name + '].ready')) {
            name = null;
        }
        clearTimeout(removeActiveTimer[name]);
        M.query.forEach('[data-menu]', function (menu) {
            if (menu.dataset.menu === name) {
                M.switchClass(menu, [], 'active');
                setTimeout(function () {
                    M.switchClass(menu, [], 'ready');
                });
            }
            else {
                M.switchClass(menu, ['ready']);
                removeActiveTimer[menu.dataset.menu] = setTimeout(function () {
                    M.switchClass(menu, ['active']);
                }, ANIMATION_DELAY);
            }
        });
        M.query.forEach('[data-menu-show]', function (menuShow) {
            M.switchClass(menuShow, ['active'], menuShow.dataset.menuShow === name ? 'active' : null);
            setTimeout(function () {
                M.switchClass(menuShow, ['ready'], menuShow.dataset.menuShow === name ? 'ready' : null);
            });
        });
    };

    menu.scan = function () {
        M.query.forEach('[data-menu-show]', function (menuShow) {
            if (!menuShow._M_menuShowInitialized) {
                menuShow._M_menuShowInitialized = true;
                M.click(menuShow, function () {
                    menu.show(menuShow.dataset.menuShow);
                });
            }
        });
        M.query.forEach('[data-menu-hide]', function (menuHide) {
            if (!menuHide._M_menuHideInitialized) {
                menuHide._M_menuHideInitialized = true;
                M.click(menuHide, function () {
                    menu.hide(menuHide.dataset.menuHide);
                });
            }
        });
    };
})();

/**
 * M - Menu
 * @author Nate Ferrero
 */
(function () {
    var M = this.M;
    var modalConfig = {};
    var hideTimer = {};
    var ANIMATION_DELAY = 300;

    var modal = this.M.modal = function (name, config) {
        if (config) {
            modalConfig[name] = config;
        }
    };

    modal.hide = function (name) {
        M.query.forEach('[data-modal=' + name + ']', function (modal) {
            M.switchClass(modal, ['ready'], null);
            hideTimer[name] = setTimeout(function () {
                M.switchClass(modal, ['active'], null);
            }, ANIMATION_DELAY);
        });
    };

    modal.show = function (name) {
        /**
         * Opening a modal closes all menus
         */
        M.menu.show();
        clearTimeout(hideTimer[name]);
        M.query.forEach('[data-modal=' + name + ']', function (modal) {
            M.switchClass(modal, [], 'active');
            setTimeout(function () {
                M.switchClass(modal, [], 'ready');
            });
        });
    };

    modal.scan = function () {
        M.query.forEach('[data-modal-show]', function (modalShow) {
            if (!modalShow._M_modalShowInitialized) {
                modalShow._M_modalShowInitialized = true;
                M.click(modalShow, function () {
                    modal.show(modalShow.dataset.modalShow);
                });
            }
        });
        M.query.forEach('[data-modal-hide]', function (modalHide) {
            if (!modalHide._M_modalHideInitialized) {
                modalHide._M_modalHideInitialized = true;
                M.click(modalHide, function () {
                    modal.hide(modalHide.dataset.modalHide);
                });
            }
        });
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

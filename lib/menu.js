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
        M.query.forEach('[data-menu-show]', function (menuShow) {
            M.switchClass(menuShow, ['active'], menuShow.dataset.menuShow === name ? 'active' : null);
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

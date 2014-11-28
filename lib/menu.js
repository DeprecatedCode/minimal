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

/**
 * M - Menu
 * @author Nate Ferrero
 */
(function () {
    var M = this.M;
    var modalConfig = {};
    var hideTimer = {};
    var ANIMATION_DELAY = 700;

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

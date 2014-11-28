
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

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

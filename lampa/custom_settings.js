(function () {
    'use strict';

    function applySettings() {
        
    }

    if (window.appready) {
        applySettings();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') applySettings();
        });
    }

})();

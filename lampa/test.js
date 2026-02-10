(function () {
    'use strict';

    function startPlugin() {
        // --- ЧАСТЬ 1: НАСТРОЙКИ LAMPA (Storage) ---
        

    }

    // Запуск скрипта после готовности приложения
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }

})();

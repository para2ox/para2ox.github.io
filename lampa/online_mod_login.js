(function () {
    'use strict';

    function init() {
        // Выполнение запрошенных действий по установке настроек
        Lampa.Storage.set('online_mod_full_episode_title', 'true');
        Lampa.Storage.set('online_mod_save_last_balanser', 'true');
        Lampa.Storage.set('online_mod_rezka2_fix_stream', 'true');
        Lampa.Storage.set('online_mod_rezka2_status', 'true');
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        
        // Опционально: вывод сообщения в консоль для подтверждения запуска
        console.log('Online Mod Config: Настройки применены успешно');
    }

    // Проверка готовности приложения перед запуском
    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') init();
        });
    }
})();

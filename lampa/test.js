(function () {
    'use strict';

    function startPlugin() {
        // --- ЧАСТЬ 1: НАСТРОЙКИ LAMPA (Storage) ---
        
        // Преднастройки Lampa
        Lampa.Storage.set('start_page', 'main');
        Lampa.Storage.set('source', 'SURS');
        Lampa.Storage.set('glass_style', true);
		Lampa.Storage.set('glass_opacity', 'easy');
        Lampa.Storage.set('video_quality_default', '1080');
		Lampa.Storage.set('interface_size', 'small');
		Lampa.Storage.set('keyboard_type', 'integrate');
		// Lampa.Storage.set('background', true);
		// Lampa.Storage.set('background_type', 'simple');
		// Lampa.Storage.set('black_style', true);

        // Настраиваем плагин Online Mod
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        Lampa.Storage.set('online_mod_balanser', 'rezka2');
        Lampa.Storage.set('online_mod_save_last_balanser', true);
        Lampa.Storage.set('online_mod_full_episode_title', true);
        Lampa.Storage.set('online_mod_rezka2_fix_stream', true);
        // Lampa.Storage.set('online_mod_proxy_rezka2', false);

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

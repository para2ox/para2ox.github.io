(function() {
    'use strict';

    function applySettings() {
        // Преднастройки
        Lampa.Storage.set('glass_style', true);
        Lampa.Storage.set('source', 'SURS');
        
        // Настраиваем HDrezka в Online Mod
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        Lampa.Storage.set('online_mod_balanser', 'rezka2');
        Lampa.Storage.set('online_mod_save_last_balanser', true);
        Lampa.Storage.set('online_mod_full_episode_title', true);
        Lampa.Storage.set('online_mod_rezka2_fix_stream', true);
        Lampa.Storage.set('online_mod_proxy_rezka2', true);

        // Скрываем пункты шапки
        Lampa.Storage.set('head_filter_show_premium', false);
        Lampa.Storage.set('head_filter_show_feed', false);
        Lampa.Storage.set('head_filter_show_notice', false);
        Lampa.Storage.set('head_filter_show_broadcast', false);
        Lampa.Storage.set('head_filter_show_fullscreen', false);
        Lampa.Storage.set('head_filter_show_reload', false);
        Lampa.Storage.set('head_filter_show_blackfriday', false);

        // Скрываем пункты меню
        Lampa.Storage.set('menu_hide', '["Лента","Фильмы","Мультфильмы","Сериалы","Персоны","Релизы","Аниме","Подписки","Расписание","Торренты","Спорт","Для детей","Информация","Консоль"]');

    }

    if (window.appready) {
        applySettings();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') applySettings();
        });
    }
})();

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

        // Настраиваем плагин Applecation
		Lampa.Storage.set('applecation_text_scale', '120');
		Lampa.Storage.set('applecation_spacing_scale', '90');
        Lampa.Storage.set('applecation_show_ratings', true);
        Lampa.Storage.set('applecation_ratings_source', 'builtin');
        Lampa.Storage.set('applecation_mdblist_api_key', 'wf3lktoy7sbbjrcnmf8g9omsw');
        Lampa.Storage.set('applecation_enabled_ratings', '["tmdb","imdb","tomatoes","popcorn","metacritic","letterboxd","trakt"]');
        Lampa.Storage.set('applecation_show_episode_count', true);

        // Настраиваем кнопки на странице фильма в плагине LME Movie Enhancer
        Lampa.Storage.set('lme_showbutton', true);
        Lampa.Storage.set('lme_buttonhide', '["view--trailer","view--online","button--reaction","button--subscribe","button--options"]');
        Lampa.Storage.set('lme_buttonsort', '["view--online_mod","view--torrent","view--rutube_trailer","button--book"]');

        // Скрываем и сортируем пункты меню
        Lampa.Storage.set('menu_hide', '["Подборки","Каталог","Лента","Фильмы","Мультфильмы","Сериалы","Персоны","Релизы","Аниме","Подписки","Расписание","Торренты","Спорт","Для детей","Shots","Torrent Manager"]');
        Lampa.Storage.set('menu_sort', '["Поиск","Главная","Избранное","История","Фильтр"]');
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

(function () {
    'use strict';

    function applySettings() {
        // Преднастройки Lampa
        Lampa.Storage.set('start_page', 'main');
        Lampa.Storage.set('source', 'SURS');
        Lampa.Storage.set('glass_style', true);
        Lampa.Storage.set('video_quality_default', '720');

        // Настраиваем плагин Online Mod
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        Lampa.Storage.set('online_mod_balanser', 'rezka2');
        Lampa.Storage.set('online_mod_save_last_balanser', true);
        Lampa.Storage.set('online_mod_full_episode_title', true);
        Lampa.Storage.set('online_mod_rezka2_fix_stream', true);
        Lampa.Storage.set('online_mod_proxy_rezka2', false);

        // Настраиваем кнопки на странице фильма в плагине LME Movie Enhancer
        Lampa.Storage.set('lme_showbutton', true);
        Lampa.Storage.set('lme_buttonhide', '["view--trailer","shots-view-button","button--reaction","button--subscribe","button--options"]');
        Lampa.Storage.set('lme_buttonsort', '["view--online_mod","view--torrent","button--book","view--trailer","button--reaction","button--subscribe","button--options"]');

        // Скрываем пункты меню
        Lampa.Storage.set('menu_hide', '["Лента","Фильмы","Мультфильмы","Сериалы","Персоны","Релизы","Аниме","Подписки","Расписание","Торренты","Спорт","Для детей","Shots","Torrent Manager"]');
        
        // Скрываем пункты шапки и нескрываемые пункты меню
        var css = '.head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon, .menu .menu__split, .menu li.menu__item[data-action="settings"], .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;}';

        var style = document.createElement('style');
        style.type = 'text/css';
        
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        
        // Пытаемся добавить в head, если нет - в body
        var target = document.head || document.getElementsByTagName('head')[0] || document.body;
        if (target) {
            target.appendChild(style);
            console.log('My Config: CSS стили успешно внедрены');
        } else {
            console.log('My Config: Ошибка - некуда внедрить CSS');
        }
    }

    if (window.appready) {
        applySettings();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') applySettings();
        });
    }

})();

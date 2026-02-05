(function() {
    'use strict';

    function applySettings() {
        // --- ТВОИ НАСТРОЙКИ ---
        
        // Авторизация в HDrezka
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        
        // Ставим HDrezka балансером по умолчанию
        Lampa.Storage.set('online_mod_balanser', 'rezka2');
        
        // Включаем сохранение последнего балансера
        Lampa.Storage.set('online_mod_save_last_balanser', true);
        
        // Включаем отображение полного названия эпизода
        Lampa.Storage.set('online_mod_full_episode_title', true);
        
        // Фикс видеопотока (важно для некоторых провайдеров)
        Lampa.Storage.set('online_mod_rezka2_fix_stream', true);
        
        // (bullshit?) Включаем проксирование для Rezka. БЕЗ ЭТОГО куки не отправятся на TV/PC, так как браузер блокирует заголовок Cookie
        // Lampa.Storage.set('online_mod_proxy_rezka2', true);

        // Скрываем лишние пункты в шапке (через настройки Lampa)
        Lampa.Storage.set('head_filter_show_premium', false);
        Lampa.Storage.set('head_filter_show_feed', false);
        Lampa.Storage.set('head_filter_show_notice', false);
        Lampa.Storage.set('head_filter_show_broadcast', false);
        Lampa.Storage.set('head_filter_show_fullscreen', false);
        Lampa.Storage.set('head_filter_show_reload', false);
        Lampa.Storage.set('head_filter_show_blackfriday', false);
        
        // Скрываем лишние пункты в боковом меню (через настройки Lampa)
        Lampa.Storage.set('menu_hide', '["Лента","Фильмы","Мультфильмы","Сериалы","Персоны","Релизы","Аниме","Подписки","Расписание","Торренты","Спорт","Для детей","Информация","Консоль"]');

        
        // --- НОВЫЙ БЛОК: Жесткое скрытие через CSS ---
        
        var css = `
            /* В оригинальном расширении указан неверный класс для скрытия full--screen */
            .full--screen,
            
            /* Скрытие пунктов меню по data-action */
            li.menu__item[data-action="about"],
            li.menu__item[data-action="console"] {
                display: none !important;
            }
        `;

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    if (window.appready) {
        applySettings();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') applySettings();
        });
    }
})();

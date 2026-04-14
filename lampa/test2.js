(function () {
    'use strict';

    // Меняем ID, чтобы сбросить кэш старой нерабочей версии в памяти ТВ
    var plugin_id = 'my_super_config_v2';
    if (window[plugin_id]) return;
    window[plugin_id] = true;

    try {
        function startPlugin() {
            
            // --- ЧАСТЬ 1: ЗАГРУЗКА ВНЕШНИХ ПЛАГИНОВ ---
            if (window.Lampa && Lampa.Utils && Lampa.Utils.putScriptAsync) {
                Lampa.Utils.putScriptAsync([
                    'https://aviamovie.github.io/surs.js',
                    'https://ipavlin98.github.io/lmp-plugins/int.js',
                    'https://darkestclouds.github.io/plugins/applecation/applecation.js',
                    'http://cub.red/plugin/tmdb-proxy',
                    'http://bwa.ad/rc',
                    'https://lampame.github.io/main/lme.js',
                    'https://ipavlin98.github.io/lmp-plugins/series-progress-fix.js',
                    'https://nb557.github.io/plugins/free.js',
                    'https://ipavlin98.github.io/lmp-plugins/rt.js',
                    'https://ipavlin98.github.io/lmp-plugins/search-focus-no-mic.js',
                    'http://94.103.86.206/plugins/nots',
                    'https://darkestclouds.github.io/plugins/easytorrent/easytorrent.js',
                    'https://lampame.github.io/main/pubtorr.js',
                    'https://lampame.github.io/main/torrentmanager.js',
                    'https://e.vg/IqhjvbiYo'
                ], function () {
                    console.log('My Config: Внешние плагины успешно загружены');
                });
            }

            // --- ЧАСТЬ 2: НАСТРОЙКИ LAMPA ---
            function safeSetConfig(key, value) {
                if (window.Lampa && Lampa.Storage && String(Lampa.Storage.get(key)) !== String(value)) {
                    Lampa.Storage.set(key, value);
                }
            }
            
            safeSetConfig('start_page', 'main');
            safeSetConfig('surs_name', 'P2X');
            safeSetConfig('source', 'P2X');
            safeSetConfig('glass_style', true);
            safeSetConfig('glass_opacity', 'easy');
            safeSetConfig('mask', true);
            safeSetConfig('video_quality_default', '1080');
            safeSetConfig('interface_size', 'small');
            safeSetConfig('keyboard_type', 'integrate');
            safeSetConfig('menu_always', false);
            safeSetConfig('screensaver', 'false');
            safeSetConfig('advanced_animation', true);
            safeSetConfig('shots_in_card', 'false');
            safeSetConfig('shots_in_player', 'false');
            safeSetConfig('bwaesgcmkey', 'NkL56zBHtwCjcOuE4RQmXMcVr2HhIh4cDEdLqknju7w=');
            safeSetConfig('applecation_text_scale', '120');
            safeSetConfig('applecation_spacing_scale', '90');
            safeSetConfig('applecation_show_ratings', true);
            safeSetConfig('applecation_ratings_source', 'builtin');
            safeSetConfig('applecation_mdblist_api_key', 'wf3lktoy7sbbjrcnmf8g9omsw');
            safeSetConfig('applecation_enabled_ratings', '["tmdb","imdb","tomatoes","popcorn","metacritic","letterboxd","trakt"]');
            safeSetConfig('applecation_show_episode_count', true);
            safeSetConfig('logo_show', 'false');
            safeSetConfig('show_background', 'true');
            safeSetConfig('status', 'true');
            safeSetConfig('seas', 'true');
            safeSetConfig('eps', 'true');
            safeSetConfig('rat', 'false');
            safeSetConfig('si_colored_ratings', 'false');
            safeSetConfig('si_rating_border', 'false');
            safeSetConfig('async_load', 'true');
            safeSetConfig('hide_captions', 'true');
            safeSetConfig('wide_post', 'false');
            safeSetConfig('lme_showbutton', true);
            safeSetConfig('lme_buttonhide', '["view--trailer","button--reaction","button--subscribe","button--options"]');
            safeSetConfig('lme_buttonsort', '["view--online:443719427","view--online","view--online_mod","view--torrent","view--rutube_trailer","button--book"]');
            safeSetConfig('torrserver_savedb', true);
            safeSetConfig('torrserver_preload', 'false');
            safeSetConfig('lmetorrentSelect', 'universalClient');
            safeSetConfig('menu_hide', '["Подборки","Каталог","Лента","Фильмы","Мультфильмы","Сериалы","Персоны","Релизы","Аниме","Подписки","Расписание","Торренты","Спорт","Для детей","Shots","Torrent Manager"]');
            safeSetConfig('menu_sort', '["Поиск","Главная","Избранное","История","Фильтр"]');


            // --- ЧАСТЬ 3: ES5 СОВМЕСТИМАЯ CSS ИНЪЕКЦИЯ (ДЛЯ ТВ) ---
            var css = '';
            css += '.head .head__logo-icon, .head .open--search, .head .open--settings, .head .time--clock + div, .head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon {display: none !important;} ';
            css += '.menu li.menu__item[data-action="streaming"], .menu li.menu__item[data-action="catalog"], .menu li.menu__item[data-action="feed"], .menu li.menu__item[data-action="movie"], .menu li.menu__item[data-action="cartoon"], .menu li.menu__item[data-action="tv"], .menu li.menu__item[data-action="myperson"], .menu li.menu__item[data-action="relise"], .menu li.menu__item[data-action="anime"], .menu li.menu__item[data-action="subscribes"], .menu li.menu__item[data-action="timetable"], .menu li.menu__item[data-action="mytorrents"], .menu li.menu__item[data-action="kids"], .menu li.menu__item:not([data-action]) {display: none !important;} ';
            css += '.menu .menu__split, .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;} ';
            css += '.wrap__left .scroll__content {display: flex; flex-direction: column; min-height: 100vh;} .wrap__left .scroll__body {margin-top: auto; margin-bottom: auto;} ';
            css += '.head__title {visibility: hidden;} ';
            css += '.head, .head .open--profile, .head .head__backward, .head .head__menu-icon, .head .head__title, .head .head__markers, .head .head__time { display: none; } ';
            css += '.wrap__left { padding: 0; } ';
            css += '.wrap__content { padding: 0 !important; } ';
            css += '.wrap__content .applecation .activity__body .full-start__background { margin-top: 4em !important; } ';
            css += '.wrap__content .applecation.full-start-new { margin-bottom: 8em; } ';
            css += '.wrap__content .applecation.full-start-new .full-start-new__right { margin-bottom: -4em; } ';
            css += '.wrap__content .activity__body > div > div { padding: 1em 2em !important; } ';
            css += '.new-interface-info__body { padding: 0.2em 1.5em 0 !important; } ';
            css += '.full-start-new__buttons { padding-top: 1em; } ';
            css += '.items-line__head { margin-top: 3.5em; } ';
            css += '.scroll--horizontal .scroll__content { margin-top: 0.5em; } ';
            css += '.new-interface-info__body:not(:has(.visible)) { display: none; } ';
            css += ':root { --menu-bg: rgba(20, 20, 23, 0.75); --menu-bg-hover: rgba(20, 20, 23, 0.95); --menu-width-collapsed: 72px; --menu-width-expanded: 200px; --accent-color: #e50914; --text-color: #e8e8e8; --text-color-active: #ffffff; --blur-strength: 10px; --transition-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); } ';
            css += '.menu { pointer-events: auto; border-radius: 24px; border-radius: 0 24px 24px 0; transition: width var(--transition-speed), background var(--transition-speed); display: flex; flex-direction: column; padding: 15px 0; } ';
            css += '.menu__item { position: relative; display: flex; align-items: center; height: 50px; padding: 0 24px; color: var(--text-color); cursor: pointer; transition: all 0.2s ease; text-decoration: none; white-space: nowrap; background: transparent; border-radius: 1em; } ';
            css += '.menu__item:hover, .menu__item.active, .menu__item.focus { color: var(--text-color-active); background: rgba(255, 255, 255, 0.12); } ';
            css += '.menu__item::before { content: ""; position: absolute; left: 0px; top: 50%; transform: translateY(-50%); width: 3px; height: 0; background-color: var(--accent-color); border-radius: 0 4px 4px 0; transition: height 0.2s ease; box-shadow: 0 0 10px var(--accent-color); } ';
            css += '.menu__item.active::before, .menu__item.focus::before { height: 60%; } ';
            css += '.menu__ico { display: flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; margin-right: 20px; } ';
            css += '.menu__item.focus .menu__ico svg > * { width: 24px; height: 24px; stroke: currentColor !important; transition: transform 0.2s; } ';
            css += '.menu__item.focus .menu__ico svg path { fill: currentColor !important; } ';
            css += '.menu__item:hover .menu__ico svg { transform: scale(1.1); } ';
            css += '.menu__text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 500; transform: translateX(-10px); transition: opacity 0.3s ease, transform 0.3s ease; } ';
            css += '.menu__split { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 10px 24px; width: calc(100% - 48px); } ';
            css += '.head__body { padding: 0 !important; } ';
            css += '.online.selector { border-radius: 1em; } ';
            css += '.card .card__view::before, .card-episode .full-episode::before, .register::before, .online.selector::before { content: ""; position: absolute; inset: 0; border: 0 !important; border-radius: 1em; pointer-events: none; opacity: 0; transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: opacity; z-index: 2; box-shadow: inset 2px 2px 1px rgba(255, 255, 255, 0.30), inset -2px -2px 2px rgba(255, 255, 255, 0.30); background: radial-gradient(circle at center, transparent 58%, rgba(255, 255, 255, 0.22) 75%, rgba(255, 255, 255, 0.38) 90%), radial-gradient(120% 85% at 18% 10%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.10) 38%, transparent 62%); mix-blend-mode: screen; } ';
            css += '.card .card__view::after, .card-episode .full-episode::after, .register::after, .online.selector::after { display: none; } ';
            css += '.card.focus .card__view::before, .card.hover .card__view::before, .card-episode.focus .full-episode::before, .register.focus::before, .online.selector.focus::before { opacity: 1; } ';
            css += '.card.focus, .card-episode.focus, .register.focus { transform: scale(1.08) translateY(-6px) !important; z-index: 10; } ';
            css += '.online.selector.focus { transform: scale(1.01) !important; z-index: 10; box-shadow: none !important; } ';
            css += '.card, .card-episode, .register, .online.selector { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform; -webkit-animation: none !important; animation: none !important; } ';
            css += '.card.focus .card__view, .card.hover .card__view, .card-episode.focus .full-episode, .register.focus, .online.selector.focus { position: relative !important; border-radius: 1em !important; background: rgba(255, 255, 255, 0.05) !important; flex-shrink: 0 !important; transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform, box-shadow, backdrop-filter; -webkit-animation: none !important; animation: none !important; } ';
            css += '.card .card__view, .card-episode .full-episode, .register, .online.selector { animation: none !important; margin-bottom: 1em; } ';
            css += '.card__type, .card__quality { z-index: 2; } ';

            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) style.styleSheet.cssText = css;
            else style.appendChild(document.createTextNode(css));
            
            var target = document.head || document.getElementsByTagName('head')[0] || document.body;
            if (target) target.appendChild(style);


            // --- ЧАСТЬ 4: ЗАЩИТА ОТ ВЫБРОСА НА ГЛАВНУЮ ---
            function injectRouteGuard() {
                if (!window.Lampa || !Lampa.Activity || !Lampa.Activity.push) return;
                var originalPush = Lampa.Activity.push;
                
                Lampa.Activity.push = function (params) {
                    var active = Lampa.Activity.active();
                    if (active && active.component === 'full' && (params.component === 'main' || params.component === 'surs')) {
                        return false; 
                    }
                    return originalPush.apply(this, arguments);
                };

                setTimeout(function() {
                    Lampa.Activity.push = originalPush;
                }, 4000);
            }
            injectRouteGuard();


            // --- ЧАСТЬ 5: КНОПКА ПОИСКА В МЕНЮ ---
            var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
            var searchItem = $('<li class="menu__item selector" data-action="search_button"><div class="menu__ico">' + icon + '</div><div class="menu__text">Поиск</div></li>');

            searchItem.on('hover:enter', function () {
                var originalSearch = $('.head .open--search');
                if (originalSearch.length) originalSearch.trigger('hover:enter');
                else if (window.Lampa && Lampa.Search) Lampa.Search.open();
            });

            if ($('.

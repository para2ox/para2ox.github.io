(function () {
    'use strict';

    // =======================================================
    // 1. МГНОВЕННАЯ ИНЪЕКЦИЯ СТИЛЕЙ (Убираем мигание)
    // =======================================================
    var css = '';

    // Блок 1: Старые стили
    css += '.head .head__logo-icon, .head .open--search, .head .open--settings, .head .time--clock + div, .head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon {display: none !important;}\n';
    css += '.menu li.menu__item[data-action="streaming"], .menu li.menu__item[data-action="catalog"], .menu li.menu__item[data-action="feed"], .menu li.menu__item[data-action="movie"], .menu li.menu__item[data-action="cartoon"], .menu li.menu__item[data-action="tv"], .menu li.menu__item[data-action="myperson"], .menu li.menu__item[data-action="relise"], .menu li.menu__item[data-action="anime"], .menu li.menu__item[data-action="subscribes"], .menu li.menu__item[data-action="timetable"], .menu li.menu__item[data-action="mytorrents"], .menu li.menu__item[data-action="kids"], .menu li.menu__item:not([data-action]) {display: none !important;}\n';
    css += '.menu .menu__split, .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;}\n';
    css += '.wrap__left .scroll__content {display: flex; flex-direction: column; min-height: 100vh;} .wrap__left .scroll__body {margin-top: auto; margin-bottom: auto;}\n';
    css += '.head__title {visibility: hidden;}\n';

    // Блок 2: Новые стили (Отформатировано точно как в вашем оригинале)
    css += '.head, .head .open--profile, .head .head__backward, .head .head__menu-icon, .head .head__title, .head .head__markers, .head .head__time {\n';
    css += '    display: none;\n';
    css += '}\n';
    css += '\n';
    css += '.wrap__left {\n';
    css += '    padding: 0;\n';
    css += '}\n';
    css += '\n';
    css += '.wrap__content {\n';
    css += '    padding: 0 !important;\n';
    css += '}\n';
    css += '/*.wrap__content .applecation .activity__body {\n';
    css += '    margin-top: 4em !important;\n';
    css += '}*/\n';
    css += '.wrap__content .applecation .activity__body .full-start__background {\n';
    css += '    margin-top: 4em !important;\n';
    css += '}\n';
    css += '.wrap__content .applecation.full-start-new {\n';
    css += '    margin-bottom: 8em;\n';
    css += '}\n';
    css += '.wrap__content .applecation.full-start-new .full-start-new__right {\n';
    css += '    margin-bottom: -4em;\n';
    css += '}\n';
    css += '\n';
    css += '.wrap__content .activity__body > div > div {\n';
    css += '    padding: 1em 2em !important;\n';
    css += '}\n';
    css += '.new-interface-info__body {\n';
    css += '    padding: 0.2em 1.5em 0 !important;\n';
    css += '}\n';
    css += '\n';
    css += '.full-start-new__buttons {\n';
    css += '    padding-top: 1em;\n';
    css += '}\n';
    css += '\n';
    css += '.items-line__head {\n';
    css += '    margin-top: 3.5em;\n';
    css += '}\n';
    css += '\n';
    css += '.scroll--horizontal .scroll__content {\n';
    css += '    margin-top: 0.5em;\n';
    css += '}\n';
    css += '\n';
    css += '/* .new-interface-info__body:not(:has(.visible)) {\n';
    css += '    display: none;\n';
    css += '} */\n';
    css += '\n';
    css += '/* Основные переменные для легкой настройки */\n';
    css += ':root {\n';
    css += '    --menu-bg: rgba(20, 20, 23, 0.75);\n';
    css += '    --menu-bg-hover: rgba(20, 20, 23, 0.95);\n';
    css += '    --menu-width-collapsed: 72px;\n';
    css += '    --menu-width-expanded: 200px;\n';
    css += '    --accent-color: #e50914;\n';
    css += '    --text-color: #e8e8e8;\n';
    css += '    --text-color-active: #ffffff;\n';
    css += '    --blur-strength: 10px;\n';
    css += '    --transition-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n';
    css += '}\n';
    css += '\n';
    css += '/* Сам контейнер меню */\n';
    css += '.menu {\n';
    css += '    pointer-events: auto;\n';
    css += '    border-radius: 24px;\n';
    css += '    border-radius: 0 24px 24px 0;\n';
    css += '    transition: width var(--transition-speed), background var(--transition-speed);\n';
    css += '    display: flex;\n';
    css += '    flex-direction: column;\n';
    css += '    padding: 15px 0;\n';
    css += '}\n';
    css += '\n';
    css += '/* Элемент меню */\n';
    css += '.menu__item {\n';
    css += '    position: relative;\n';
    css += '    display: flex;\n';
    css += '    align-items: center;\n';
    css += '    height: 50px;\n';
    css += '    padding: 0 24px;\n';
    css += '    color: var(--text-color);\n';
    css += '    cursor: pointer;\n';
    css += '    transition: all 0.2s ease;\n';
    css += '    text-decoration: none;\n';
    css += '    white-space: nowrap;\n';
    css += '    background: transparent;\n';
    css += '    border-radius: 1em;\n';
    css += '}\n';
    css += '\n';
    css += '/* Ховер эффект и активное состояние */\n';
    css += '.menu__item:hover,\n';
    css += '.menu__item.active,\n';
    css += '.menu__item.focus {\n';
    css += '    color: var(--text-color-active);\n';
    css += '    background: rgba(255, 255, 255, 0.12);\n';
    css += '    zbox-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);\n';
    css += '}\n';
    css += '\n';
    css += '/* Акцентная полоска слева при наведении */\n';
    css += '.menu__item::before {\n';
    css += '    content: "";\n';
    css += '    position: absolute;\n';
    css += '    left: 0px;\n';
    css += '    top: 50%;\n';
    css += '    transform: translateY(-50%);\n';
    css += '    width: 3px;\n';
    css += '    height: 0;\n';
    css += '    background-color: var(--accent-color);\n';
    css += '    border-radius: 0 4px 4px 0;\n';
    css += '    transition: height 0.2s ease;\n';
    css += '    box-shadow: 0 0 10px var(--accent-color);\n';
    css += '}\n';
    css += '\n';
    css += '.menu__item.active::before,\n';
    css += '.menu__item.focus::before {\n';
    css += '    height: 60%;\n';
    css += '}\n';
    css += '\n';
    css += '/* Иконки */\n';
    css += '.menu__ico {\n';
    css += '    display: flex;\n';
    css += '    align-items: center;\n';
    css += '    justify-content: center;\n';
    css += '    min-width: 24px;\n';
    css += '    height: 24px;\n';
    css += '    margin-right: 20px;\n';
    css += '}\n';
    css += '\n';
    css += '.menu__item.focus .menu__ico svg > * {\n';
    css += '    width: 24px;\n';
    css += '    height: 24px;\n';
    css += '    stroke: currentColor !important;\n';
    css += '    transition: transform 0.2s;\n';
    css += '}\n';
    css += '\n';
    css += '.menu__item.focus .menu__ico svg path {\n';
    css += '    fill: currentColor !important;\n';
    css += '}\n';
    css += '\n';
    css += '/* Анимация иконки при наведении */\n';
    css += '.menu__item:hover .menu__ico svg {\n';
    css += '    transform: scale(1.1);\n';
    css += '}\n';
    css += '\n';
    css += '/* Текст меню */\n';
    css += '.menu__text {\n';
    css += '    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\n';
    css += '    font-size: 15px;\n';
    css += '    font-weight: 500;\n';
    css += '    transform: translateX(-10px);\n';
    css += '    transition: opacity 0.3s ease, transform 0.3s ease;\n';
    css += '}\n';
    css += '\n';
    css += '/* Разделитель секций */\n';
    css += '.menu__split {\n';
    css += '    height: 1px;\n';
    css += '    background: rgba(255, 255, 255, 0.1);\n';
    css += '    margin: 10px 24px;\n';
    css += '    width: calc(100% - 48px);\n';
    css += '}\n';
    css += '\n';
    css += '.head__body {\n';
    css += '    padding: 0 !important;\n';
    css += '}\n';
    css += '\n';
    css += '.online.selector {\n';
    css += '    border-radius: 1em;\n';
    css += '}\n';
    css += '\n';
    css += '.card .card__view::before,\n';
    css += '.card .card__view::before,\n';
    css += '.card-episode .full-episode::before,\n';
    css += '.register::before,\n';
    css += '.online.selector::before {\n';
    css += '    content: "";\n';
    css += '    position: absolute;\n';
    css += '    inset: 0;\n';
    css += '    border: 0 !important;\n';
    css += '    border-radius: 1em;\n';
    css += '    pointer-events: none;\n';
    css += '    opacity: 0;\n';
    css += '    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;\n';
    css += '    will-change: opacity;\n';
    css += '    z-index: 2;\n';
    css += '    box-shadow: inset 2px 2px 1px rgba(255, 255, 255, 0.30), inset -2px -2px 2px rgba(255, 255, 255, 0.30);\n';
    css += '    background: radial-gradient(circle at center, transparent 58%, rgba(255, 255, 255, 0.22) 75%, rgba(255, 255, 255, 0.38) 90%), radial-gradient(120% 85% at 18% 10%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.10) 38%, transparent 62%);\n';
    css += '    mix-blend-mode: screen;\n';
    css += '}\n';
    css += '\n';
    css += '.card .card__view::after,\n';
    css += '.card .card__view::after,\n';
    css += '.card-episode .full-episode::after,\n';
    css += '.register::after,\n';
    css += '.online.selector::after {\n';
    css += '    display: none;\n';
    css += '}\n';
    css += '\n';
    css += '.card.focus .card__view::before,\n';
    css += '.card.hover .card__view::before,\n';
    css += '.card-episode.focus .full-episode::before,\n';
    css += '.register.focus::before,\n';
    css += '.online.selector.focus::before {\n';
    css += '    opacity: 1;\n';
    css += '}\n';
    css += '\n';
    css += '.card.focus,\n';
    css += '.card-episode.focus,\n';
    css += '.register.focus {\n';
    css += '    transform: scale(1.08) translateY(-6px) !important;\n';
    css += '    z-index: 10;\n';
    css += '}\n';
    css += '.online.selector.focus {\n';
    css += '    transform: scale(1.01) !important;\n';
    css += '    z-index: 10;\n';
    css += '    box-shadow: none !important;\n';
    css += '}\n';
    css += '\n';
    css += '.card,\n';
    css += '.card-episode,\n';
    css += '.register,\n';
    css += '.online.selector {\n';
    css += '    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;\n';
    css += '    will-change: transform;\n';
    css += '    -webkit-animation: none !important;\n';
    css += '    animation: none !important;\n';
    css += '}\n';
    css += '\n';
    css += '.card.focus .card__view,\n';
    css += '.card.hover .card__view,\n';
    css += '.card-episode.focus .full-episode,\n';
    css += '.register.focus,\n';
    css += '.online.selector.focus {\n';
    css += '    position: relative !important;\n';
    css += '    border-radius: 1em !important;\n';
    css += '    background: rgba(255, 255, 255, 0.05) !important;\n';
    css += '    flex-shrink: 0 !important;\n';
    css += '    transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;\n';
    css += '    will-change: transform, box-shadow, backdrop-filter;\n';
    css += '    -webkit-animation: none !important;\n';
    css += '    animation: none !important;\n';
    css += '}\n';
    css += '\n';
    css += '.card .card__view,\n';
    css += '.card-episode .full-episode,\n';
    css += '.register,\n';
    css += '.online.selector {\n';
    css += '    animation: none !important;\n';
    css += '    margin-bottom: 1em;\n';
    css += '}\n';
    css += '\n';
    css += '.card__type, .card__quality {\n';
    css += '    z-index: 2;\n';
    css += '}\n';

    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    
    var target = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    if (target) {
        target.appendChild(style);
        console.log('My Config: CSS стили успешно внедрены (Сразу при старте)');
    } else {
        console.log('My Config: Ошибка - некуда внедрить CSS');
    }


    // =======================================================
    // 2. ЗАЩИТА ANDROID TV (Route Guard)
    // =======================================================
    var bootTime = Date.now();
    var routeGuardActive = true;
    var guardInterval = setInterval(function() {
        if (window.Lampa && window.Lampa.Activity) {
            clearInterval(guardInterval);
            var originalPush = Lampa.Activity.push;
            Lampa.Activity.push = function (params) {
                if (routeGuardActive) {
                    if (Date.now() - bootTime < 4000) {
                        var active = Lampa.Activity.active();
                        if (active && active.component === 'full' && (params.component === 'main' || params.component === 'surs')) {
                            console.log('My Config: Заблокирован случайный редирект на главную (Android TV)');
                            return false; 
                        }
                    } else {
                        routeGuardActive = false;
                    }
                }
                return originalPush.apply(this, arguments);
            };
        }
    }, 50);


    // =======================================================
    // 3. ВАША ОРИГИНАЛЬНАЯ ЛОГИКА НАСТРОЕК
    // =======================================================
    function startPlugin() {
        
        if (Lampa.Utils && Lampa.Utils.putScriptAsync) {
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
                console.log('Внешние плагины успешно загружены');
            });
        }

        Lampa.Storage.set('start_page', 'main');
        Lampa.Storage.set('surs_name', 'P2X');
        Lampa.Storage.set('source', 'P2X');
        Lampa.Storage.set('glass_style', true);
        Lampa.Storage.set('glass_opacity', 'easy');
        Lampa.Storage.set('mask', true);
        Lampa.Storage.set('video_quality_default', '1080');
        Lampa.Storage.set('interface_size', 'small');
        Lampa.Storage.set('keyboard_type', 'integrate');
        Lampa.Storage.set('menu_always', false);
        Lampa.Storage.set('screensaver', 'false');
        Lampa.Storage.set('advanced_animation', true);
        Lampa.Storage.set('shots_in_card', 'false');
        Lampa.Storage.set('shots_in_player', 'false');

        Lampa.Storage.set('bwaesgcmkey', 'NkL56zBHtwCjcOuE4RQmXMcVr2HhIh4cDEdLqknju7w=');

        Lampa.Storage.set('applecation_text_scale', '120');
        Lampa.Storage.set('applecation_spacing_scale', '90');
        Lampa.Storage.set('applecation_show_ratings', true);
        Lampa.Storage.set('applecation_ratings_source', 'builtin');
        Lampa.Storage.set('applecation_mdblist_api_key', 'wf3lktoy7sbbjrcnmf8g9omsw');
        Lampa.Storage.set('applecation_enabled_ratings', '["tmdb","imdb","tomatoes","popcorn","metacritic","letterboxd","trakt"]');
        Lampa.Storage.set('applecation_show_episode_count', true);

        Lampa.Storage.set('logo_show', 'false');
        Lampa.Storage.set('show_background', '

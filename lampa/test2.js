(function () {
    'use strict';

    // ==========================================
    // ЧАСТЬ 1: МГНОВЕННЫЙ ЗАГРУЗЧИК (Стили + Главный экран)
    // ==========================================
    
    // Нативный инжектор скриптов (не зависит от Lampa, не вызывает ошибок)
    function loadPlugin(url) {
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = true; // Загружаем асинхронно, чтобы не тормозить запуск
        script.onload = function() { console.log('My Config: Загружен ' + url); };
        var target = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
        target.appendChild(script);
    }

    // 1. СРАЗУ ЖЕ грузим surs.js (Главную страницу)
    loadPlugin('https://aviamovie.github.io/surs.js');

    // 2. СРАЗУ ЖЕ внедряем стили (без современных селекторов вроде :has, которые крашат Android TV)
    function injectCSS() {
        var css = `
            body, #app { background-color: #141417 !important; }
            .head .head__logo-icon, .head .open--search, .head .open--settings, .head .time--clock + div, .head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon {display: none !important;}
            .menu li.menu__item[data-action="streaming"], .menu li.menu__item[data-action="catalog"], .menu li.menu__item[data-action="feed"], .menu li.menu__item[data-action="movie"], .menu li.menu__item[data-action="cartoon"], .menu li.menu__item[data-action="tv"], .menu li.menu__item[data-action="myperson"], .menu li.menu__item[data-action="relise"], .menu li.menu__item[data-action="anime"], .menu li.menu__item[data-action="subscribes"], .menu li.menu__item[data-action="timetable"], .menu li.menu__item[data-action="mytorrents"], .menu li.menu__item[data-action="kids"], .menu li.menu__item:not([data-action]) {display: none !important;}
            .menu .menu__split, .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;}
            .wrap__left .scroll__content {display: flex; flex-direction: column; min-height: 100vh;} .wrap__left .scroll__body {margin-top: auto; margin-bottom: auto;}
            .head__title {visibility: hidden;}

            .head, .head .open--profile, .head .head__backward, .head .head__menu-icon, .head .head__title, .head .head__markers, .head .head__time { display: none; }
            .wrap__left { padding: 0; }
            .wrap__content { padding: 0 !important; }
            .wrap__content .applecation .activity__body .full-start__background { margin-top: 4em !important; }
            .wrap__content .applecation.full-start-new { margin-bottom: 8em; }
            .wrap__content .applecation.full-start-new .full-start-new__right { margin-bottom: -4em; }
            .wrap__content .activity__body > div > div { padding: 1em 2em !important; }
            .new-interface-info__body { padding: 0.2em 1.5em 0 !important; }
            .full-start-new__buttons { padding-top: 1em; }
            .items-line__head { margin-top: 3.5em; }
            .scroll--horizontal .scroll__content { margin-top: 0.5em; }

            :root {
                --menu-bg: rgba(20, 20, 23, 0.75);
                --menu-bg-hover: rgba(20, 20, 23, 0.95);
                --menu-width-collapsed: 72px;
                --menu-width-expanded: 200px;
                --accent-color: #e50914; 
                --text-color: #e8e8e8;
                --text-color-active: #ffffff;
                --blur-strength: 10px;
                --transition-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            }

            .menu { pointer-events: auto; border-radius: 24px; border-radius: 0 24px 24px 0; transition: width var(--transition-speed), background var(--transition-speed); display: flex; flex-direction: column; padding: 15px 0; }
            .menu__item { position: relative; display: flex; align-items: center; height: 50px; padding: 0 24px; color: var(--text-color); cursor: pointer; transition: all 0.2s ease; text-decoration: none; white-space: nowrap; background: transparent; border-radius: 1em; }
            .menu__item:hover, .menu__item.active, .menu__item.focus { color: var(--text-color-active); background: rgba(255, 255, 255, 0.12); }
            .menu__item::before { content: ''; position: absolute; left: 0px; top: 50%; transform: translateY(-50%); width: 3px; height: 0; background-color: var(--accent-color); border-radius: 0 4px 4px 0; transition: height 0.2s ease; box-shadow: 0 0 10px var(--accent-color); }
            .menu__item.active::before, .menu__item.focus::before { height: 60%; }
            .menu__ico { display: flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; margin-right: 20px; }
            .menu__item.focus .menu__ico svg > * { width: 24px; height: 24px; stroke: currentColor !important; transition: transform 0.2s; }
            .menu__item.focus .menu__ico svg path { fill: currentColor !important; }
            .menu__item:hover .menu__ico svg { transform: scale(1.1); }
            .menu__text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 500; transform: translateX(-10px); transition: opacity 0.3s ease, transform 0.3s ease; }
            .menu__split { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 10px 24px; width: calc(100% - 48px); }
            .head__body { padding: 0 !important; }
            .online.selector { border-radius: 1em; }

            .card .card__view::before, .card-episode .full-episode::before, .register::before, .online.selector::before { content: ''; position: absolute; inset: 0; border: 0 !important; border-radius: 1em; pointer-events: none; opacity: 0; transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: opacity; z-index: 2; box-shadow: inset 2px 2px 1px rgba(255, 255, 255, 0.30), inset -2px -2px 2px rgba(255, 255, 255, 0.30); background: radial-gradient(circle at center, transparent 58%, rgba(255, 255, 255, 0.22) 75%, rgba(255, 255, 255, 0.38) 90%), radial-gradient(120% 85% at 18% 10%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.10) 38%, transparent 62%); mix-blend-mode: screen; }
            .card .card__view::after, .card-episode .full-episode::after, .register::after, .online.selector::after { display: none; }
            .card.focus .card__view::before, .card.hover .card__view::before, .card-episode.focus .full-episode::before, .register.focus::before, .online.selector.focus::before { opacity: 1; }
            .card.focus, .card-episode.focus, .register.focus { transform: scale(1.08) translateY(-6px) !important; z-index: 10; }
            .online.selector.focus { transform: scale(1.01) !important; z-index: 10; box-shadow: none !important; }
            .card, .card-episode, .register, .online.selector { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform; -webkit-animation: none !important; animation: none !important; }
            .card.focus .card__view, .card.hover .card__view, .card-episode.focus .full-episode, .register.focus, .online.selector.focus { position: relative !important; border-radius: 1em !important; background: rgba(255, 255, 255, 0.05) !important; flex-shrink: 0 !important; transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform, box-shadow, backdrop-filter; -webkit-animation: none !important; animation: none !important; }
            .card .card__view, .card-episode .full-episode, .register, .online.selector { animation: none !important; margin-bottom: 1em; }
            .card__type, .card__quality { z-index: 2; }
        `;

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) style.styleSheet.cssText = css;
        else style.appendChild(document.createTextNode(css));

        var target = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
        if (target) target.appendChild(style);
    }
    injectCSS();

    // 3. Загружаем остальные плагины (также нативно и безопасно)
    var externalPlugins = [
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
    ];
    externalPlugins.forEach(function(url) { loadPlugin(url); });


    // ==========================================
    // ЧАСТЬ 2: НАСТРОЙКИ LAMPA И ЗАЩИТА ANDROID TV
    // ==========================================
    
    function safeSetConfig(key, value) {
        if (!window.Lampa || !window.Lampa.Storage) return;
        if (String(Lampa.Storage.get(key)) !== String(value)) {
            Lampa.Storage.set(key, value);
        }
    }

    function applySettings() {
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
        safeSetConfig('applecation

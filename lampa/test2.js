(function () {
    'use strict';

    try {
        // ==========================================
        // ЧАСТЬ 1: НАИВНЫЙ ИНЖЕКТОР ПЛАГИНОВ И СТИЛЕЙ
        // ==========================================
        
        function loadPlugin(url) {
            var script = document.createElement('script');
            script.src = url;
            script.type = 'text/javascript';
            script.async = true;
            var target = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
            target.appendChild(script);
        }

        // 1. Грузим главную страницу СРАЗУ
        loadPlugin('https://aviamovie.github.io/surs.js');

        // 2. Внедряем стили (строгий ES5, без обратных кавычек)
        function injectCSS() {
            var css = '';
            css += 'body, #app { background-color: #141417 !important; } ';
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
            
            // Переменные
            css += ':root { --menu-bg: rgba(20, 20, 23, 0.75); --menu-bg-hover: rgba(20, 20, 23, 0.95); --menu-width-collapsed: 72px; --menu-width-expanded: 200px; --accent-color: #e50914; --text-color: #e8e8e8; --text-color-active: #ffffff; --blur-strength: 10px; --transition-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); } ';
            
            // Меню
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

            // Карточки
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

            var target = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
            if (target) target.appendChild(style);
        }
        injectCSS();

        // 3. Грузим остальные плагины
        var plugins = [
            'https://ipavlin98.github.io/lmp-plugins/int.js',
            'https://darkestclouds.github.io/plugins/applecation/applecation.js',
            '

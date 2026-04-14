(function () {
    'use strict';

    // Защита от двойного запуска
    var plugin_id = 'my_super_config_v1';
    if (window[plugin_id]) return;
    window[plugin_id] = true;

    try {
        // =======================================================
        // 1. БЕЗОПАСНАЯ ИНЪЕКЦИЯ СТИЛЕЙ СРАЗУ ПРИ СТАРТЕ
        // =======================================================
        var cssLines = [
            '.head .head__logo-icon, .head .open--search, .head .open--settings, .head .time--clock + div, .head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon {display: none !important;}',
            '.menu li.menu__item[data-action="streaming"], .menu li.menu__item[data-action="catalog"], .menu li.menu__item[data-action="feed"], .menu li.menu__item[data-action="movie"], .menu li.menu__item[data-action="cartoon"], .menu li.menu__item[data-action="tv"], .menu li.menu__item[data-action="myperson"], .menu li.menu__item[data-action="relise"], .menu li.menu__item[data-action="anime"], .menu li.menu__item[data-action="subscribes"], .menu li.menu__item[data-action="timetable"], .menu li.menu__item[data-action="mytorrents"], .menu li.menu__item[data-action="kids"], .menu li.menu__item:not([data-action]) {display: none !important;}',
            '.menu .menu__split, .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;}',
            '.wrap__left .scroll__content {display: flex; flex-direction: column; min-height: 100vh;} .wrap__left .scroll__body {margin-top: auto; margin-bottom: auto;}',
            '.head__title {visibility: hidden;}',

            '.head, .head .open--profile, .head .head__backward, .head .head__menu-icon, .head .head__title, .head .head__markers, .head .head__time { display: none; }',
            '.wrap__left { padding: 0; }',
            '.wrap__content { padding: 0 !important; }',
            
            '/*.wrap__content .applecation .activity__body { margin-top: 4em !important; }*/',
            
            '.wrap__content .applecation .activity__body .full-start__background { margin-top: 4em !important; }',
            '.wrap__content .applecation.full-start-new { margin-bottom: 8em; }',
            '.wrap__content .applecation.full-start-new .full-start-new__right { margin-bottom: -4em; }',
            '.wrap__content .activity__body > div > div { padding: 1em 2em !important; }',
            '.new-interface-info__body { padding: 0.2em 1.5em 0 !important; }',
            '.full-start-new__buttons { padding-top: 1em; }',
            '.items-line__head { margin-top: 3.5em; }',
            '.scroll--horizontal .scroll__content { margin-top: 0.5em; }',
            
            '/* .new-interface-info__body:not(:has(.visible)) { display: none; } */',

            ':root { --menu-bg: rgba(20, 20, 23, 0.75); --menu-bg-hover: rgba(20, 20, 23, 0.95); --menu-width-collapsed: 72px; --menu-width-expanded: 200px; --accent-color: #e50914; --text-color: #e8e8e8; --text-color-active: #ffffff; --blur-strength: 10px; --transition-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }',

            '.menu { pointer-events: auto; border-radius: 24px; border-radius: 0 24px 24px 0; transition: width var(--transition-speed), background var(--transition-speed); display: flex; flex-direction: column; padding: 15px 0; }',
            '.menu__item { position: relative; display: flex; align-items: center; height: 50px; padding: 0 24px; color: var(--text-color); cursor: pointer; transition: all 0.2s ease; text-decoration: none; white-space: nowrap; background: transparent; border-radius: 1em; }',
            '.menu__item:hover, .menu__item.active, .menu__item.focus { color: var(--text-color-active); background: rgba(255, 255, 255, 0.12); zbox-shadow: 0 15px 40px rgba(0, 0, 0, 0.4); }',
            '.menu__item::before { content: ""; position: absolute; left: 0px; top: 50%; transform: translateY(-50%); width: 3px; height: 0; background-color: var(--accent-color); border-radius: 0 4px 4px 0; transition: height 0.2s ease; box-shadow: 0 0 10px var(--accent-color); }',
            '.menu__item.active::before, .menu__item.focus::before { height: 60%; }',
            '.menu__ico { display: flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; margin-right: 20px; }',
            '.menu__item.focus .menu__ico svg > * { width: 24px; height: 24px; stroke: currentColor !important; transition: transform 0.2s; }',
            '.menu__item.focus .menu__ico svg path { fill: currentColor !important; }',
            '.menu__item:hover .menu__ico svg { transform: scale(1.1); }',
            '.menu__text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 500; transform: translateX(-10px); transition: opacity 0.3s ease, transform 0.3s ease; }',
            '.menu__split { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 10px 24px; width: calc(100% - 48px); }',
            '.head__body { padding: 0 !important; }',
            '.online.selector { border-radius: 1em; }',

            '.card .card__view::before, .card .card__view::before, .card-episode .full-episode::before, .register::before, .online.selector::before { content: ""; position: absolute; inset: 0; border: 0 !important; border-radius: 1em; pointer-events: none; opacity: 0; transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: opacity; z-index: 2; box-shadow: inset 2px 2px 1px rgba(255, 255, 255, 0.30), inset -2px -2px 2px rgba(255, 255, 255, 0.30); background: radial-gradient(circle at center, transparent 58%, rgba(255, 255, 255, 0.22) 75%, rgba(255, 255, 255, 0.38) 90%), radial-gradient(120% 85% at 18% 10%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.10) 38%, transparent 62%); mix-blend-mode: screen; }',
            '.card .card__view::after, .card .card__view::after, .card-episode .full-episode::after, .register::after, .online.selector::after { display: none; }',
            '.card.focus .card__view::before, .card.hover .card__view::before, .card-episode.focus .full-episode::before, .register.focus::before, .online.selector.focus::before { opacity: 1; }',
            '.card.focus, .card-episode.focus, .register.focus { transform: scale(1.08) translateY(-6px) !important; z-index: 10; }',
            '.online.selector.focus { transform: scale(1.01) !important; z-index: 10; box-shadow: none !important; }',
            '.card, .card-episode, .register, .online.selector { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform; -webkit-animation: none !important; animation: none !important; }',
            '.card.focus .card__view, .card.hover .card__view, .card-episode.focus .full-episode, .register.focus, .online.selector.focus { position: relative !important; border-radius: 1em !important; background: rgba(255, 255, 255, 0.05) !important; flex-shrink: 0 !important; transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform, box-shadow, backdrop-filter; -webkit-animation: none !important; animation: none !important; }',
            '.card .card__view, .card-episode .full

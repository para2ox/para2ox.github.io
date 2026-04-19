(function () {
    'use strict';

    // Защита от двойного запуска плагина
    var plugin_id = 'my_super_config_v1';
    if (window[plugin_id]) return;
    window[plugin_id] = true;

    try {
        // --- ГЛОБАЛЬНЫЕ НАСТРОЙКИ (LGBT & DMCA) --- http://cub.rip/plugin/lgbt & https://nb557.github.io/plugins/free.js
        window.lampa_settings = window.lampa_settings || {};
        window.lampa_settings.dcma = false; // Старый формат флага
        
        window.lampa_settings.disable_features = window.lampa_settings.disable_features || {};
        window.lampa_settings.disable_features.lgbt = true;
        window.lampa_settings.disable_features.dmca = true;
        
        window.lampa_settings.plugins_store = false;
        window.lampa_settings.feed = false;
    	
        function loadPlugin(url) {
            var script = document.createElement('script');
            script.src = url;
            script.type = 'text/javascript';
            script.async = true;
            var target = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
            target.appendChild(script);
        }

        // --- НОВОЕ: ЗАГРУЗКА ВНЕШНИХ ПЛАГИНОВ ---
        
        // 1. Грузим главную страницу СРАЗУ
        loadPlugin('https://aviamovie.github.io/surs.js'); // Функциональная главная страница с годными рекомендациями

        // --- ЧАСТЬ 2: CSS ИНЪЕКЦИЯ ---
        
        // 2. Внедряем стили
        function injectCSS() {
            var css = '';
            css += 'body, #app { background-color: #141417 !important; } ';
            
            // Блок 1: Старые стили (Скрытие элементов шапки и меню)
            css += '.head .head__logo-icon, .head .open--search, .head .open--settings, .head .time--clock + div, .head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon {display: none !important;} ';
            css += '.menu li.menu__item[data-action="streaming"], .menu li.menu__item[data-action="catalog"], .menu li.menu__item[data-action="feed"], .menu li.menu__item[data-action="movie"], .menu li.menu__item[data-action="cartoon"], .menu li.menu__item[data-action="tv"], .menu li.menu__item[data-action="myperson"], .menu li.menu__item[data-action="relise"], .menu li.menu__item[data-action="anime"], .menu li.menu__item[data-action="subscribes"], .menu li.menu__item[data-action="timetable"], .menu li.menu__item[data-action="mytorrents"], .menu li.menu__item[data-action="kids"], .menu li.menu__item:not([data-action]) {display: none !important;} ';
            css += '.menu .menu__split, .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;} ';
            
            // Корректировка контейнера слева (из старого кода)
            css += '.wrap__left .scroll__content {display: flex; flex-direction: column; min-height: 100vh;} .wrap__left .scroll__body {margin-top: auto; margin-bottom: auto;} ';
            css += '.head__title {visibility: hidden;} ';
            
            // Блок 2: НОВЫЕ СТИЛИ
            css += '.head, .head .open--profile, .head .head__backward, .head .head__menu-icon, .head .head__title, .head .head__markers, .head .head__time { display: none; } ';
            css += '.wrap__left { padding: 0; } ';
            css += '.wrap__content { padding: 0 !important; } ';
            css += '.wrap__content .applecation .activity__body .full-start__background { margin-top: 4em !important; } ';
            css += '.wrap__content .applecation.full-start-new { margin-bottom: 8em; } ';
            css += '.wrap__content .applecation.full-start-new .full-start-new__right { margin-bottom: -4em; } ';
			css += '.applecation__description-wrapper { transition: padding 0.25s ease, margin 0.25s ease, transform 0.25s ease, opacity 0.4s ease-out !important; } ';
			css += '.applecation__description-wrapper.focus { padding: .35em .7em 0.15em !important; margin: 0.5em 0 !important; } ';
            css += 'body:not(.touch-device) .wrap__content .activity__body > div > div { padding: 1em 2em !important; } ';
            css += '.new-interface-info__body { padding: 0.2em 1.5em 0 !important; } ';
            css += '.full-start-new__buttons { padding-top: 1em; } ';
            css += '.items-line__head { margin-top: 3.5em; } ';
            css += '.scroll--horizontal .scroll__content { margin-top: 0.5em; } ';
            css += '.new-interface-info__body:not(:has(.visible)) { display: none; } ';
            css += '.full-review-add + * { margin: 0; } ';
            css += '.selectbox-item__subtitle { margin-top: 0 !important; } ';
            
            css += '.applecation__overlay.loaded { -webkit-mask-image: none !important; mask-image: none !important; left: -200px !important; opacity: 1 !important; transition: opacity 1s ease !important; } ';
            css += '.menu--open .applecation__overlay.full-start__background.loaded { opacity: 1 !important; transition: opacity 1s ease !important; } ';
            css += '.applecation-animated.loaded { -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 0.792) 55%, rgba(0, 0, 0, 0.504) 65%, rgba(0, 0, 0, 0.264) 75%, rgba(0, 0, 0, 0.12) 85%, rgba(0, 0, 0, 0.043) 95%, rgba(0, 0, 0, 0) 100%) !important; mask-image: linear-gradient(to left, rgba(0, 0, 0, 0.792) 55%, rgba(0, 0, 0, 0.504) 65%, rgba(0, 0, 0, 0.264) 75%, rgba(0, 0, 0, 0.12) 85%, rgba(0, 0, 0, 0.043) 95%, rgba(0, 0, 0, 0) 100%) !important; } ';
            
            // Скрытие фонового изображения не на карточках
            //css += 'body:not(:has(.full-start__background.active)) .background__fade { opacity: 0 !important; pointer-events: none; } ';
            
            // Основные переменные для легкой настройки
            css += ':root { --menu-bg: rgba(20, 20, 23, 0.75); --menu-bg-hover: rgba(20, 20, 23, 0.95); --menu-width-collapsed: 72px; --menu-width-expanded: 200px; --accent-color: #e50914; --text-color: #e8e8e8; --text-color-active: #ffffff; --blur-strength: 10px; --transition-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); } ';
            
            // Сам контейнер меню
            css += '.menu { pointer-events: auto; border-radius: 24px; border-radius: 0 24px 24px 0; transition: width var(--transition-speed), background var(--transition-speed); display: flex; flex-direction: column; padding: 15px 0; } ';
            // Элемент меню
            css += '.menu__item { position: relative; display: flex; align-items: center; height: 50px; padding: 0 24px; color: var(--text-color); cursor: pointer; transition: all 0.2s ease; text-decoration: none; white-space: nowrap; background: transparent; border-radius: 1em; } ';
            // Ховер эффект и активное состояние
            css += '.menu__item:hover, .menu__item.active, .menu__item.focus { color: var(--text-color-active); background: rgba(255, 255, 255, 0.12); } ';
            // Акцентная полоска слева при наведении
            css += '.menu__item::before { content: ""; position: absolute; left: 0px; top: 50%; transform: translateY(-50%); width: 3px; height: 0; background-color: var(--accent-color); border-radius: 0 4px 4px 0; transition: height 0.2s ease; box-shadow: 0 0 10px var(--accent-color); } ';
            css += '.menu__item.active::before, .menu__item.focus::before { height: 60%; } ';
            // Иконки
            css += '.menu__ico { display: flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; margin-right: 20px; } ';
            css += '.menu__item.focus .menu__ico svg > * { width: 24px; height: 24px; stroke: currentColor !important; transition: transform 0.2s; } ';
            css += '.menu__item.focus .menu__ico svg path { fill: currentColor !important; } ';
            // Анимация иконки при наведении
            css += '.menu__item:hover .menu__ico svg { transform: scale(1.1); } ';
            // Текст меню
            css += '.menu__text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 500; transform: translateX(-10px); transition: opacity 0.3s ease, transform 0.3s ease; } ';
            // Разделитель секций
            css += '.menu__split { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 10px 24px; width: calc(100% - 48px); } ';
            css += '.head__body { padding: 0 !important; } ';
            // Скрытие кнопок на странице фильма
            css += '.full-start-new__buttons .button--reaction, .full-start-new__buttons .button--subscribe { display: none; } ';
            
            // Интерфейс меню
            css += 'body.orientation--landscape .settings__content, .selectbox__content { margin-top: 3vh; margin-bottom: 3vh; border-radius: 2em; height: 94vh !important; overflow: hidden; } ';
			css += 'body.orientation--landscape.settings--open .settings__content, body.orientation--landscape.selectbox--open .selectbox__content { -webkit-transform: translate3d(-105%, 0, 0); transform: translate3d(-105%, 0, 0); } ';
			css += '.settings__content .scroll__body::after, .selectbox__content .scroll__body::after { content: ""; display: block; height: 20em; width: 100%; pointer-events: none; } '; // фикс пустого пространства в меню
			css += '.settings__title, .selectbox__title { text-align: center; } ';
            css += '.selectbox-item, .settings-folder, .settings-param { margin: 12px; } ';
            
            // Карточки
            css += '.simple-button--filter > div { z-index: 9; border-radius: 1.2em; padding: 0.4em 1.2em; font-weight: 600; color: rgba(255, 255, 255, 0.9); background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content) { border-radius: 1em; overflow: hidden; } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content) * { filter: none !important; } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content, .online-prestige, .torrent-item, .explorer-card__head-img)::before { backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important; } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content)::after { color: #fff !important; border-color: #fff !important; } ';
            css += '.card .card__view::before, .card-episode .full-episode::before, .register::before, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content)::before { content: ""; position: absolute; inset: 0; border: 0 !important; border-radius: 1em; pointer-events: none; opacity: 0; /*transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;*/ will-change: opacity; z-index: 2; box-shadow: inset 2px 2px 1px rgba(255, 255, 255, 0.30), inset -2px -2px 2px rgba(255, 255, 255, 0.30); background: radial-gradient(ellipse 130% 100% at 15% 10%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 40%, transparent 65%), linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.38) 100%); mix-blend-mode: screen; } ';
            css += '.card .card__view::after, .card-episode .full-episode::after, .register::after, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content)::after { display: none; } ';
            css += '.card.focus .card__view::before, .card.hover .card__view::before, .card-episode.focus .full-episode::before, .register.focus::before, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content).focus::before { opacity: 1; } ';
            css += '.card.focus, .card-episode.focus, .register.focus { transform: scale(1.08) translateY(-6px) !important; z-index: 10; } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content).focus { transform: scale(1.00) !important; z-index: 10; box-shadow: none !important; } ';
            css += '.card, .card-episode, .register, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content) { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform; -webkit-animation: none !important; animation: none !important; } ';
            css += '.card.focus .card__view, .card.hover .card__view, .card-episode.focus .full-episode, .register.focus, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .applecation-description-overlay__content).focus { position: relative !important; border-radius: 1em !important; background: rgba(255, 255, 255, 0.05) !important; color: #fff !important; flex-shrink: 0 !important; transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform, box-shadow, backdrop-filter; -webkit-animation: none !important; animation: none !important; } ';
            css += '.card .card__view, .card-episode .full-episode, .register { animation: none !important; margin-bottom: 1em; } ';
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
            'https://ipavlin98.github.io/lmp-plugins/int.js', // Красивый интерфейс главной страницы
            'https://darkestclouds.github.io/plugins/applecation/applecation.js', // Красивый интерфейс страницы фильма
            'http://cub.rip/plugin/tmdb-proxy', // TMDB прокси для беспробелмного отображения обложек
            'http://bwa.ad/rc', // Фильмы и сериалы
            //'http://z01.online/live',
            //'https://lampame.github.io/main/lme.js', // Твики для интерфейса (использую только для удобного отображения кнопок на странице фильма)
            //'https://nb557.github.io/plugins/free.js', // Обход блокировок контента от Lampa (полезно для стримингов вроде START)
            //'https://amikdn.github.io/anti-dmca.js', // Резерв плагина free.js
            'https://ipavlin98.github.io/lmp-plugins/rt.js', // RuTube трейлеры
            'https://ipavlin98.github.io/lmp-plugins/search-focus-no-mic.js', // Фокус на поле ввода при открытии поиска
            'https://ipavlin98.github.io/lmp-plugins/series-progress-fix.js',
            //'http://94.103.86.206/plugins/nots', // Скрытие карточек с TS
            'https://darkestclouds.github.io/plugins/easytorrent/easytorrent.js', // Умная сортировка файлов торрентов
            'https://lampame.github.io/main/pubtorr.js', // Сборник публичных парсеров  с отображением статуса доступности
            'https://lampame.github.io/main/torrentmanager.js', // Скачивание торрентов
            'https://e.vg/IqhjvbiYo' // AdBlock
        ];
        
        for (var i = 0; i < plugins.length; i++) {
            if (plugins[i] && !plugins[i].startsWith('//')) {
                loadPlugin(plugins[i]);
            }
        }

        // ==========================================
        // ЧАСТЬ 1: НАСТРОЙКИ LAMPA (Storage) И ЗАЩИТА АНДРОИД ТВ
        // ==========================================
        function safeSetConfig(key, value) {
            Lampa.Storage.set(key, value);
        }

        function applySettings() {
            // Преднастройки Lampa
            safeSetConfig('start_page', 'main');
            safeSetConfig('surs_name', '🪐 Phobos');
            safeSetConfig('source', '🪐 Phobos');
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
            
            // Настраиваем Z01
            //safeSetConfig('aesgcmkey', 'oWBi2fxPIt9if+y0IAuRhSmthXrqPUCNyRXP9BCITsA=');

            // Настраиваем плагин Applecation
            safeSetConfig('applecation_text_scale', '120');
            safeSetConfig('applecation_spacing_scale', '90');
            safeSetConfig('applecation_show_ratings', true);
            safeSetConfig('applecation_ratings_source', 'builtin');
            safeSetConfig('applecation_mdblist_api_key', 'wf3lktoy7sbbjrcnmf8g9omsw');
            safeSetConfig('applecation_enabled_ratings', '["tmdb","imdb","tomatoes","popcorn","metacritic","letterboxd","trakt"]');
            safeSetConfig('applecation_show_episode_count', true);

            // Настраиваем плагин New Interface
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

            // Настраиваем кнопки на странице фильма в плагине LME Movie Enhancer
            safeSetConfig('lme_showbutton', true);
            safeSetConfig('lme_buttonhide', '["view--trailer","button--reaction","button--subscribe","button--options"]');
            safeSetConfig('lme_buttonsort', '["view--online:443719427","view--online","view--online_mod","view--torrent","view--rutube_trailer","button--book"]');

            // Настраиваем TorrServer
            safeSetConfig('torrserver_savedb', true);
            safeSetConfig('torrserver_preload', 'false');

            // Настраиваем плагин для скачивания торрентов
            safeSetConfig('lmetorrentSelect', 'universalClient');

            // Скрываем и сортируем пункты меню
            safeSetConfig('menu_hide', '["Подборки","Каталог","Лента","Фильмы","Мультфильмы","Сериалы","Персоны","Релизы","Аниме","Подписки","Расписание","Торренты","Спорт","Для детей","Shots","Torrent Manager"]');
            safeSetConfig('menu_sort', '["Поиск","Главная","Избранное","История","Фильтр"]');
            
            // --- РОТАЦИЯ КЛЮЧЕЙ BWA ---
			var keysPoolVersion = 1; 
			
			// Используем объекты: жестко привязываем ID к ключу. 
			// Если ключ "умрет", просто удали строку. Оставшиеся ID не изменятся.
			var bwaKeys = [
			    { id: 1, val: 'NkL56zBHtwCjcOuE4RQmXMcVr2HhIh4cDEdLqknju7w=' },
			    { id: 2, val: 'hXOq/KULJzyAStw3NpvIUGUhYBg5cZCImd+4NzOOT5k=' },
			    { id: 3, val: '0qbzgmc7uo7zjZgK89ecau5p8lV9+X2Qm66K8EHpJWU=' },
			    { id: 4, val: 'ojGSTMxgCdZ6yAdv0Zlxz5AqhR8RLAPJWixR+lHd90o=' },
			    { id: 5, val: 'qq7eHbk7XJ/dfWM0Lw6QzrO2drLlGUGqmTuAlmkegYQ=' }
			];
			
			var savedKey = Lampa.Storage.get('phobos_bwa_key_value');
			var savedVersion = Lampa.Storage.get('phobos_bwa_pool_version');
			
			// Проверяем, жив ли сохраненный ключ в текущем пуле
			var isKeyAlive = false;
			if (savedKey) {
			    for (var i = 0; i < bwaKeys.length; i++) {
			        if (bwaKeys[i].val === savedKey) {
			            isKeyAlive = true;
			            // Перестраховка: обновляем ID в памяти на случай несовпадений
			            Lampa.Storage.set('phobos_bwa_key_id', bwaKeys[i].id);
			            break;
			        }
			    }
			}
			
			// Если ключа нет, он удален из пула, или изменилась версия пула — генерируем новый
			if (!isKeyAlive || savedVersion !== keysPoolVersion) {
			    var randomIndex = Math.floor(Math.random() * bwaKeys.length);
			    var selected = bwaKeys[randomIndex];
			    
			    savedKey = selected.val;
			    Lampa.Storage.set('phobos_bwa_key_value', savedKey);
			    Lampa.Storage.set('phobos_bwa_key_id', selected.id); // <-- Сохраняем ID ключа
			    Lampa.Storage.set('phobos_bwa_pool_version', keysPoolVersion);
			}
			
			// Применяем ключ
			safeSetConfig('bwaesgcmkey', savedKey);
        }

        function injectRouteGuard() {
            var originalPush = Lampa.Activity.push;
            var bootTime = Date.now();
            var routeGuardActive = true;

            Lampa.Activity.push = function (params) {
                if (routeGuardActive) {
                    if (Date.now() - bootTime < 4000) {
                        var active = Lampa.Activity.active();
                        if (active && active.component === 'full' && (params.component === 'main' || params.component === 'surs')) {
                            return false; // Блокировка редиректа
                        }
                    } else {
                        routeGuardActive = false;
                    }
                }
                return originalPush.apply(this, arguments);
            };
        }

        var isBooted = false;
        var bootInterval = setInterval(function() {
            if (window.Lampa && window.Lampa.Storage && window.Lampa.Activity && !isBooted) {
                isBooted = true;
                clearInterval(bootInterval);
                applySettings();
                injectRouteGuard();
            }
        }, 10);

        // ==========================================
        // ЧАСТЬ 3: КНОПКА ПОИСКА В МЕНЮ
        // ==========================================
        function appendSearchButton() {
            // SVG иконка лупы
            var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
            // Создаем элемент меню
            var searchItem = $('<li class="menu__item selector" data-action="search_button"><div class="menu__ico">' + icon + '</div><div class="menu__text">Поиск</div></li>');

            // Навешиваем событие
            searchItem.on('hover:enter', function () {
                var originalSearch = $('.head .open--search');
                if (originalSearch.length) originalSearch.trigger('hover:enter');
                else if (Lampa.Search) Lampa.Search.open();
            });

            // Добавляем кнопку в меню
            if ($('.menu .menu__list li[data-action="search_button"]').length === 0) {
                $('.menu .menu__list').eq(0).append(searchItem);
            }
        }

        // ==========================================
		// ЧАСТЬ 4: ФИЛЬТРАЦИЯ SELECTBOX МЕНЮ (Источники и Избранное)
		// ==========================================
		function initSelectboxFilters() {
		    var observer = new MutationObserver(function(mutations) {
		        var $selectbox = $('.selectbox.animate');
		        
		        if ($selectbox.length > 0) {
		            var titleText = $selectbox.find('.selectbox__title').text().trim();
		            
		            // --- 1. ФИЛЬТР "СОРТИРОВАТЬ" ---
		            if (titleText.indexOf('Сортировать') !== -1 && !$selectbox.data('source-filtered')) {
		                var items = $selectbox.find('.selectbox-item');
		                // Защита: ждём, пока Lampa реально отрисует элементы
		                if (items.length === 0) return; 
		                
		                $selectbox.data('source-filtered', true); 
		                $selectbox.find('.selectbox__title').text('Источник');
		                
		                var keyId = Lampa.Storage.get('phobos_bwa_key_id') || '?';
		                var firstKept = null;
		                var targetFocus = null;
		                
		                items.each(function() {
		                    var $item = $(this);
		                    var $title = $item.find('.selectbox-item__title');
		                    var text = $title.text().toLowerCase();
		                    var kept = false;
		                    
		                    if (text.indexOf('rezka') !== -1) {
		                        $title.text('🪐  Phobos ' + keyId + '  •  Rezka');
		                        kept = true;
		                    } else if (text.indexOf('kinopub') !== -1) {
		                        $title.text('🪐  Phobos ' + keyId + '  •  KinoPub');
		                        kept = true;
		                    } else if (text.indexOf('filmix') !== -1) {
		                        $title.text('🪐  Phobos ' + keyId + '  •  Filmix');
		                        kept = true;
		                    }
		                    
		                    if (kept) {
		                        if (!firstKept) firstKept = $item;
		                        if ($item.hasClass('focus') || $item.hasClass('selected')) targetFocus = $item;
		                    } else {
		                        $item.removeClass('selector focus selected').hide();
		                    }
		                });
		                
		                if (!targetFocus && firstKept) targetFocus = firstKept;
		                if (targetFocus) {
		                    items.removeClass('focus');
		                    targetFocus.addClass('focus');
		                }
		                
		                setTimeout(function() {
		                    if (window.Lampa && window.Lampa.Controller) {
		                        var containerNode = $selectbox.find('.scroll__body')[0] || $selectbox[0];
		                        Lampa.Controller.collectionSet(containerNode);
		                        if (targetFocus) Lampa.Controller.collectionFocus(targetFocus[0], containerNode);
		                    }
		                }, 50);
		            }
		
		            // --- 2. ФИЛЬТР: ИЗБРАННОЕ ---
		            if (titleText.indexOf('Избранное') !== -1 && !$selectbox.data('favorites-filtered')) {
		                var $scrollBodyFav = $selectbox.find('.scroll__body');
		                // Защита от пустой отрисовки
		                if ($scrollBodyFav.children().length === 0) return; 
		                
		                $selectbox.data('favorites-filtered', true);
		                
		                $scrollBodyFav.children().each(function() {
		                    var $child = $(this);
		                    if (!$child.hasClass('selectbox-item--checkbox')) {
		                        $child.removeClass('selector focus selected').remove();
		                    }
		                });
		                
		                setTimeout(function() {
		                    if (window.Lampa && window.Lampa.Controller) {
		                        Lampa.Controller.collectionSet($scrollBodyFav[0]);
		                    }
		                }, 50);
		            }
		
		            // --- 3. СОРТИРОВКА И КАСТОМИЗАЦИЯ РОДНОГО МЕНЮ "ИСТОЧНИК" ---
		            if (titleText === 'Источник' && !$selectbox.data('source-filtered') && !$selectbox.data('real-source-ordered')) {
		                var $scrollBodyReal = $selectbox.find('.scroll__body');
		                var $items = $scrollBodyReal.find('.selectbox-item'); 
		                
		                // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ 1: Сначала ждём контент
		                if ($items.length === 0) return; 
		
		                // Только убедившись, что контент есть, ставим флаг блокировки повторных срабатываний
		                $selectbox.data('real-source-ordered', true); 
		
		                var currentKeyId = Lampa.Storage.get('phobos_bwa_key_id') || '?';
		                
		                var customSourcesOrder = [
		                    {
		                        match: 'онлайн', 
		                        title: 'Онлайн', 
		                        subtitle: 'Phobos ' + currentKeyId,
		                        icon: '<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="60" height="60"><path d="M15 3C8.373 3 3 8.373 3 15C3 21.627 8.373 27 15 27C21.627 27 27 21.627 27 15C27 8.373 21.627 3 15 3 z M 15 5C16.657 5 18 5.343 18 7C18 8.657 16.657 10 15 10C13.343 10 12 8.657 12 7C12 5.343 13.343 5 15 5 z M 7.765625 9.5585938C7.9377148 9.5724961 8.1213594 9.6117812 8.3183594 9.6757812C9.8943594 10.187781 10.756141 11.879078 10.244141 13.455078C9.7331406 15.031078 8.0408438 15.892859 6.4648438 15.380859C4.8888437 14.868859 4.9762813 13.486156 5.4882812 11.910156C5.9362813 10.531156 6.5609961 9.4612773 7.765625 9.5585938 z M 22.234375 9.5585938C23.439004 9.4612773 24.063719 10.531156 24.511719 11.910156C25.023719 13.486156 25.110156 14.868859 23.535156 15.380859C21.959156 15.892859 20.267859 15.031078 19.755859 13.455078C19.243859 11.879078 20.105641 10.187781 21.681641 9.6757812C21.878641 9.6117812 22.062285 9.5724961 22.234375 9.5585938 z M 15 13C16.105 13 17 13.895 17 15C17 16.105 16.105 17 15 17C13.895 17 13 16.105 13 15C13 13.895 13.895 13 15 13 z M 19.597656 18.472656C20.560225 18.439736 21.520781 18.870859 22.128906 19.708984C23.101906 21.049984 22.218906 22.115844 20.878906 23.089844C19.538906 24.063844 18.249391 24.575375 17.275391 23.234375C16.301391 21.894375 16.598453 20.017922 17.939453 19.044922C18.441953 18.679672 19.020115 18.492408 19.597656 18.472656 z M 10.402344 18.474609C10.979762 18.494238 11.558047 18.679672 12.060547 19.044922C13.400547 20.018922 13.698609 21.894375 12.724609 23.234375C11.750609 24.574375 10.462094 24.063844 9.1210938 23.089844C7.7800938 22.115844 6.8970938 21.048984 7.8710938 19.708984C8.4798438 18.871484 9.4399805 18.441895 10.402344 18.474609 z M 27 22.183594C26.433 23.128594 25.766 24.006063 25 24.789062L25 25C25 27.206 26.794 29 29 29C29.553 29 30 28.553 30 28C30 27.447 29.553 27 29 27C27.897 27 27 26.103 27 25L27 22.183594 z" fill="#FFFFFF" /></svg>'
		                    },
		                    {
		                        match: 'торрент', 
		                        title: 'Торренты', 
		                        subtitle: '',
		                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px" fill="currentColor"><path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4 S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851 c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29 c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8 c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722 C42.541,30.867,41.756,30.963,40.5,30.963z"></path></svg>'
		                    },
		                    {
		                        match: 'трейлер', 
		                        title: 'Трейлеры', 
		                        subtitle: '',
		                        icon: '<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="60" height="60"><path d="M26,4H4C2.895,4,2,4.895,2,6v18c0,1.105,0.895,2,2,2h22c1.105,0,2-0.895,2-2V6C28,4.895,27.105,4,26,4z M7,24H4v-3h3V24z M7,19H4v-3h3V19z M7,14H4v-3h3V14z M7,9H4V6h3V9z M19.435,15.891l-6.974,3.982C12.321,19.947,12.169,20,12,20 c-0.552,0-1-0.448-1-1v-4v-4c0-0.552,0.448-1,1-1c0.169,0,0.321,0.053,0.461,0.127l6.974,3.982C19.767,14.272,20,14.606,20,15 S19.767,15.728,19.435,15.891z M26,24h-3v-3h3V24z M26,19h-3v-3h3V19z M26,14h-3v-3h3V14z M26,9h-3V6h3V9z" fill="#FFFFFF" /></svg>'
		                    }
		                ];
		
		                $items.detach(); 
		
		                var sortedItems = [];
		                var usedIndexes = new Set();
		                var itemsArray = $items.toArray();
		
		                // 1. Применяем конфигурацию кастомизации
		                customSourcesOrder.forEach(function(config) {
		                    for (var i = 0; i < itemsArray.length; i++) {
		                        if (usedIndexes.has(i)) continue;
		
		                        var $item = $(itemsArray[i]);
		                        var itemText = $item.find('.selectbox-item__title').text().toLowerCase();
		
		                        if (itemText.indexOf(config.match) !== -1) {
		                            if (config.icon !== undefined) {
		                                $item.addClass('selectbox-item--icon');
		                                var $ico = $item.find('.selectbox-item__icon');
		                                if ($ico.length) $ico.html(config.icon);
		                                else $item.prepend('<div class="selectbox-item__icon">' + config.icon + '</div>');
		                            }
		                            
		                            if (config.title !== undefined) {
		                                $item.find('.selectbox-item__title').html(config.title);
		                            }
		                            
		                            if (config.subtitle !== undefined) {
		                                var $sub = $item.find('.selectbox-item__subtitle');
		                                if (config.subtitle === "") {
		                                    $sub.remove();
		                                } else {
		                                    if ($sub.length) $sub.html(config.subtitle);
		                                    else $item.find('.selectbox-item__title').after('<div class="selectbox-item__subtitle">' + config.subtitle + '</div>');
		                                }
		                            }
		
		                            sortedItems.push($item);
		                            usedIndexes.add(i);
		                            break;
		                        }
		                    }
		                });
		
		                // 2. Добавляем ненайденные элементы в конец списка
		                for (var j = 0; j < itemsArray.length; j++) {
		                    if (!usedIndexes.has(j)) {
		                        sortedItems.push($(itemsArray[j]));
		                    }
		                }
		
		                // 3. Возвращаем всё в DOM
		                sortedItems.forEach(function($el) {
		                    $scrollBodyReal.append($el);
		                });
		
		                // 4. Обновляем Lampa Controller
		                setTimeout(function() {
		                    if (window.Lampa && window.Lampa.Controller) {
		                        var containerNode = $scrollBodyReal[0] || $selectbox[0];
		                        Lampa.Controller.collectionSet(containerNode);
		                        
		                        var target = $scrollBodyReal.find('.selectbox-item.selected');
		                        if (!target.length) target = $scrollBodyReal.find('.selectbox-item.selector').first();
		                        
		                        if (target.length) {
		                            $scrollBodyReal.find('.selectbox-item').removeClass('focus');
		                            target.addClass('focus');
		                            Lampa.Controller.collectionFocus(target[0], containerNode);
		                        }
		                    }
		                }, 50);
		            }
		
		        } else if ($selectbox.length === 0) {
		            // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ 2: Очищаем флаги с самого компонента `.selectbox`, 
		            // а не с несуществующего на момент закрытия `.selectbox.animate`
		            $('.selectbox').data('source-filtered', false);
		            $('.selectbox').data('favorites-filtered', false);
		            $('.selectbox').data('real-source-ordered', false); 
		        }
		    });
		
		    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
		}

        // ==========================================
        // ЧАСТЬ 5: УПРАВЛЕНИЕ КОММЕНТАРИЯМИ
        // ==========================================
        function initCommentsFilter() {
            var observer = new MutationObserver(function(mutations) {
                // Оптимизация: реагируем только если были добавлены узлы
                var hasChanges = false;
                for (var i = 0; i < mutations.length; i++) {
                    if (mutations[i].addedNodes.length > 0) {
                        hasChanges = true;
                        break;
                    }
                }

                if (hasChanges) {
                    // 1. Убираем класс selector, чтобы контроллер навигации Lampa перестал видеть этот элемент.
                    //    Это исправит проблему с "залипанием" невидимого курсора.
                    var $addReviewBtn = $('.full-review-add.selector');
                    if ($addReviewBtn.length) {
                        $addReviewBtn.removeClass('selector').hide();
                    }

                    // 2. Ищем заголовки, чтобы найти родительский блок с комментариями
                    $('.items-line__title').each(function() {
                        if ($(this).text().trim() === 'Комментарии') {
                            var $itemsLine = $(this).closest('.items-line');
                            
                            // Проверяем, есть ли отзывы
                            if ($itemsLine.find('.full-review').length === 0) {
                                // Скрываем блок целиком
                                $itemsLine.hide().removeClass('layer--visible selector');
                            } else {
                                // Если комментарии прогрузились - возвращаем видимость
                                $itemsLine.show();
                            }
                        }
                    });
                }
            });

            // Наблюдаем только за DOM деревом, чтобы не грузить систему на каждое движение курсора
            observer.observe(document.body, { childList: true, subtree: true });
        }

        // Запуск скриптов после готовности приложения
        if (window.appready) {
            appendSearchButton();
            initSelectboxFilters(); // <--- Изменено здесь
            initCommentsFilter();
        } else {
            var domInterval = setInterval(function() {
                if (window.appready) {
                    clearInterval(domInterval);
                    appendSearchButton();
                    initSelectboxFilters(); // <--- И здесь
                    initCommentsFilter();
                }
            }, 100);
        }

    } catch (e) {
        console.log('Plugin Init Error', e);
    }
})();

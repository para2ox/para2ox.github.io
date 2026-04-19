(function () {
    'use strict';

    // Защита от двойного запуска плагина
    var plugin_id = 'my_super_config_v1';
    if (window[plugin_id]) return;
    window[plugin_id] = true;

    try {
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
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more) { border-radius: 1em; overflow: hidden; } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more) * { filter: none !important; } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more, .online-prestige, .torrent-item, .explorer-card__head-img)::before { backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important; } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more)::after { color: #fff !important; border-color: #fff !important; } ';
            css += '.card .card__view::before, .card-episode .full-episode::before, .register::before, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more)::before { content: ""; position: absolute; inset: 0; border: 0 !important; border-radius: 1em; pointer-events: none; opacity: 0; /*transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;*/ will-change: opacity; z-index: 2; box-shadow: inset 2px 2px 1px rgba(255, 255, 255, 0.30), inset -2px -2px 2px rgba(255, 255, 255, 0.30); background: radial-gradient(ellipse 130% 100% at 15% 10%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 40%, transparent 65%), linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.38) 100%); mix-blend-mode: screen; } ';
            css += '.card .card__view::after, .card-episode .full-episode::after, .register::after, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more)::after { display: none; } ';
            css += '.card.focus .card__view::before, .card.hover .card__view::before, .card-episode.focus .full-episode::before, .register.focus::before, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more).focus::before { opacity: 1; } ';
            css += '.card.focus, .card-episode.focus, .register.focus { transform: scale(1.08) translateY(-6px) !important; z-index: 10; } ';
            css += '.selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more).focus { transform: scale(1.00) !important; z-index: 10; box-shadow: none !important; } ';
            css += '.card, .card-episode, .register, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more) { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform; -webkit-animation: none !important; animation: none !important; } ';
            css += '.card.focus .card__view, .card.hover .card__view, .card-episode.focus .full-episode, .register.focus, .selector:not(.menu__item, .card, .show, .card-episode, .full-episode, .full-person, .full-start-new__reactions, .card-more).focus { position: relative !important; border-radius: 1em !important; background: rgba(255, 255, 255, 0.05) !important; color: #fff !important; flex-shrink: 0 !important; transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important; will-change: transform, box-shadow, backdrop-filter; -webkit-animation: none !important; animation: none !important; } ';
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
            'http://cub.red/plugin/tmdb-proxy', // TMDB прокси для беспробелмного отображения обложек
            'http://bwa.ad/rc', // Фильмы и сериалы
            //'http://z01.online/live',
            //'https://lampame.github.io/main/lme.js', // Твики для интерфейса (использую только для удобного отображения кнопок на странице фильма)
            'https://ipavlin98.github.io/lmp-plugins/series-progress-fix.js',
            'https://nb557.github.io/plugins/free.js', // Обход блокировок контента от Lampa (полезно для стримингов вроде START)
            //'https://amikdn.github.io/anti-dmca.js', // Резерв плагина free.js
            'https://ipavlin98.github.io/lmp-plugins/rt.js', // RuTube трейлеры
            'https://ipavlin98.github.io/lmp-plugins/search-focus-no-mic.js', // Фокус на поле ввода при открытии поиска
            //'http://94.103.86.206/plugins/nots', // Скрытие карточек с TS
            'https://darkestclouds.github.io/plugins/easytorrent/easytorrent.js', // Умная сортировка файлов торрентов
            'https://lampame.github.io/main/pubtorr.js', // Сборник публичных парсеров  с отображением статуса доступности
            'https://lampame.github.io/main/torrentmanager.js', // Скачивание торрентов
            //'https://e.vg/IqhjvbiYo' // AdBlock
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

            // Настраиваем BWA (http://bwa.ad/rc)
            safeSetConfig('bwaesgcmkey', 'NkL56zBHtwCjcOuE4RQmXMcVr2HhIh4cDEdLqknju7w=');
            
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
        // ЧАСТЬ 4: ФИЛЬТРАЦИЯ МЕНЮ ИСТОЧНИКОВ
        // ==========================================
        // ==========================================
        // ЧАСТЬ 4: ФИЛЬТРАЦИЯ SELECTBOX МЕНЮ (Источники и Избранное)
        // ==========================================
        function initSelectboxFilters() {
            var observer = new MutationObserver(function(mutations) {
                var $selectbox = $('.selectbox.animate');
                
                // Если меню открыто
                if ($selectbox.length > 0) {
                    var titleText = $selectbox.find('.selectbox__title').text().trim();
                    
                    // --- 1. ФИЛЬТР ИСТОЧНИКОВ (твой старый код) ---
                    if (titleText.indexOf('Сортировать') !== -1 && !$selectbox.data('source-filtered')) {
                        $selectbox.data('source-filtered', true); // Помечаем, чтобы избежать цикличности
                        
                        var items = $selectbox.find('.selectbox-item');
                        var firstKept = null;
                        var targetFocus = null;
                        
                        items.each(function() {
                            var $item = $(this);
                            var $title = $item.find('.selectbox-item__title');
                            var text = $title.text().toLowerCase();
                            var kept = false;
                            
                            if (text.indexOf('rezka') !== -1) {
                                $title.text('🪐  Phobos 2  •  Rezka');
                                kept = true;
                            } else if (text.indexOf('kinopub') !== -1) {
                                $title.text('🪐  Phobos 3  •  KinoPub');
                                kept = true;
                            } else if (text.indexOf('filmix') !== -1) {
                                $title.text('🪐  Phobos 1  •  Filmix');
                                kept = true;
                            }
                            
                            if (kept) {
                                if (!firstKept) firstKept = $item;
                                if ($item.hasClass('focus') || $item.hasClass('selected')) {
                                    targetFocus = $item;
                                }
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

                    // --- 2. НОВЫЙ ФИЛЬТР: ИЗБРАННОЕ ---
                    if (titleText.indexOf('Избранное') !== -1 && !$selectbox.data('favorites-filtered')) {
                        $selectbox.data('favorites-filtered', true);

                        var $scrollBody = $selectbox.find('.scroll__body');

                        // Перебираем всех детей внутри .scroll__body
                        $scrollBody.children().each(function() {
                            var $child = $(this);
                            
                            // Если у элемента НЕТ нужного класса — удаляем
                            if (!$child.hasClass('selectbox-item--checkbox')) {
                                // Важно снять классы навигации перед удалением из DOM, 
                                // чтобы Lampa не попыталась навести фокус на "призрака"
                                $child.removeClass('selector focus selected').remove();
                            }
                        });

                        // Обновляем контроллер навигации Lampa
                        setTimeout(function() {
                            if (window.Lampa && window.Lampa.Controller) {
                                var containerNode = $scrollBody[0] || $selectbox[0];
                                
                                // Перестраиваем карту доступных элементов
                                Lampa.Controller.collectionSet(containerNode);
                                
                                // Фокусируемся на первом оставшемся элементе (обычно это "Закладки")
                                var firstRemaining = $scrollBody.find('.selectbox-item.selector').first();
                                if (firstRemaining.length) {
                                    Lampa.Controller.collectionFocus(firstRemaining[0], containerNode);
                                }
                            }
                        }, 50);
                    }

                } else if ($selectbox.length === 0) {
                    // Сбрасываем флаги, если меню было закрыто
                    $('.selectbox').data('source-filtered', false);
                    $('.selectbox').data('favorites-filtered', false);
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

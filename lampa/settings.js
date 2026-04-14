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
            css += '.wrap__content .activity__body > div > div { padding: 1em 2em !important; } ';
            css += '.new-interface-info__body { padding: 0.2em 1.5em 0 !important; } ';
            css += '.full-start-new__buttons { padding-top: 1em; } ';
            css += '.items-line__head { margin-top: 3.5em; } ';
            css += '.scroll--horizontal .scroll__content { margin-top: 0.5em; } ';
            css += '.new-interface-info__body:not(:has(.visible)) { display: none; } ';
            
            // ДОБАВЛЕНО: Скрытие .background__fade при отсутствии .visible в .new-interface-info__body
            css += 'body:not(:has(.full-start__background.active)) .background__fade { opacity: 0 !important; pointer-events: none; } ';
            
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
            'https://ipavlin98.github.io/lmp-plugins/int.js', // Красивый интерфейс главной страницы
            'https://darkestclouds.github.io/plugins/applecation/applecation.js', // Красивый интерфейс страницы фильма
            'http://cub.red/plugin/tmdb-proxy', // TMDB прокси для беспробелмного отображения обложек
            'http://bwa.ad/rc', // Фильмы и сериалы
            'https://lampame.github.io/main/lme.js', // Твики для интерфейса (использую только для удобного отображения кнопок на странице фильма)
            'https://ipavlin98.github.io/lmp-plugins/series-progress-fix.js',
            'https://nb557.github.io/plugins/free.js', // Обход блокировок контента от Lampa (полезно для стримингов вроде START)
            //'https://amikdn.github.io/anti-dmca.js', // Резерв плагина free.js
            'https://ipavlin98.github.io/lmp-plugins/rt.js', // RuTube трейлеры
            'https://ipavlin98.github.io/lmp-plugins/search-focus-no-mic.js', // Фокус на поле ввода при открытии поиска
            'http://94.103.86.206/plugins/nots', // Скрытие карточек с TS
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
            if (!window.Lampa || !window.Lampa.Storage) return;
            if (String(Lampa.Storage.get(key)) !== String(value)) {
                Lampa.Storage.set(key, value);
            }
        }

        function applySettings() {
            // Преднастройки Lampa
            safeSetConfig('start_page', 'main');
            safeSetConfig('surs_name', 'P2X');
            safeSetConfig('source', 'P2X');
            // safeSetConfig('surs_settings', '');
            safeSetConfig('glass_style', true);
            safeSetConfig('glass_opacity', 'easy');
            safeSetConfig('mask', true);
            safeSetConfig('video_quality_default', '1080');
            safeSetConfig('interface_size', 'small');
            safeSetConfig('keyboard_type', 'integrate');
            safeSetConfig('menu_always', false);
            safeSetConfig('screensaver', 'false');
            safeSetConfig('advanced_animation', true);
            // safeSetConfig('background', true);
            // safeSetConfig('background_type', 'simple');
            // safeSetConfig('black_style', true);
            safeSetConfig('shots_in_card', 'false');
            safeSetConfig('shots_in_player', 'false');

            // Настраиваем BWA (http://bwa.ad/rc)
            safeSetConfig('bwaesgcmkey', 'NkL56zBHtwCjcOuE4RQmXMcVr2HhIh4cDEdLqknju7w=');
            //safeSetConfig('agree_installation', true);

            // Настраиваем Z01
            safeSetConfig('aesgcmkey', 'oWBi2fxPIt9if+y0IAuRhSmthXrqPUCNyRXP9BCITsA=');

            /* // Настраиваем плагин Online Mod (https://nb557.github.io/plugins/online_mod.js)
            safeSetConfig('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
            safeSetConfig('online_mod_balanser', 'rezka2');
            safeSetConfig('online_mod_save_last_balanser', true);
            safeSetConfig('online_mod_full_episode_title', true);
            safeSetConfig('online_mod_rezka2_fix_stream', true); */

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
            //safeSetConfig('torrserver_use_link', 'one');
            //safeSetConfig('torrserver_url', 'localhost:8090');
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
                // Находим оригинальную кнопку поиска в шапке (она скрыта CSS, но существует)
                var originalSearch = $('.head .open--search');
                if (originalSearch.length) originalSearch.trigger('hover:enter'); // Эмулируем нажатие на оригинальную кнопку
                else if (Lampa.Search) Lampa.Search.open(); // Резервный метод
            });

            // Добавляем кнопку в меню
            if ($('.menu .menu__list li[data-action="search_button"]').length === 0) {
                $('.menu .menu__list').eq(0).append(searchItem);
            }
        }

        // Запуск скрипта после готовности приложения
        if (window.appready) {
            appendSearchButton();
        } else {
            var domInterval = setInterval(function() {
                if (window.appready) {
                    clearInterval(domInterval);
                    appendSearchButton();
                }
            }, 100);
        }

        // ==========================================
        // ЧАСТЬ 4: ДИНАМИЧЕСКИЕ ИЗМЕНЕНИЯ ИНТЕРФЕЙСА (SELECTBOX И КНОПКА ONLINE)
        // ==========================================
        function applyDynamicModifications() {
            // 1. Скрытие 'demo' и модификация Filmix
            var selectboxItems = document.querySelectorAll('.selectbox-item:not(.modified-by-script)');
            for (var i = 0; i < selectboxItems.length; i++) {
                var item = selectboxItems[i];
                var titleElem = item.querySelector('.selectbox-item__title');
                if (titleElem) {
                    var text = titleElem.textContent || titleElem.innerText;
                    // Скрываем, если содержит слово demo
                    if (text.toLowerCase().indexOf('demo') !== -1) {
                        item.style.display = 'none';
                        item.classList.add('modified-by-script');
                    } 
                    // Находим Filmix, переименовываем и поднимаем наверх
                    else if (text.trim() === 'Filmix' || text.trim() === '👑 Filmix Premium') {
                        titleElem.textContent = '👑 Filmix Premium';
                        var parent = item.parentNode;
                        if (parent && parent.firstChild !== item) {
                            parent.insertBefore(item, parent.firstChild);
                        }
                        item.classList.add('modified-by-script');
                    }
                }
            }

            // 2. Замена SVG в кнопке view--online
            var onlineBtns = document.querySelectorAll('.lampac--button.view--online:not(.svg-modified)');
            for (var j = 0; j < onlineBtns.length; j++) {
                var btn = onlineBtns[j];
                var svg = btn.querySelector('svg');
                if (svg) {
                    var newSvg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 392.697 392.697" xml:space="preserve"><path d="M21.837,83.419l36.496,16.678L227.72,19.886c1.229-0.592,2.002-1.846,1.98-3.209c-0.021-1.365-0.834-2.592-2.082-3.145 L197.766,0.3c-0.903-0.4-1.933-0.4-2.837,0L21.873,77.036c-1.259,0.559-2.073,1.803-2.081,3.18 C19.784,81.593,20.584,82.847,21.837,83.419z" fill="currentColor"></path><path d="M185.689,177.261l-64.988-30.01v91.617c0,0.856-0.44,1.655-1.167,2.114c-0.406,0.257-0.869,0.386-1.333,0.386 c-0.368,0-0.736-0.082-1.079-0.244l-68.874-32.625c-0.869-0.416-1.421-1.293-1.421-2.256v-92.229L6.804,95.5 c-1.083-0.496-2.344-0.406-3.347,0.238c-1.002,0.645-1.608,1.754-1.608,2.944v208.744c0,1.371,0.799,2.615,2.045,3.185 l178.886,81.768c0.464,0.211,0.96,0.315,1.455,0.315c0.661,0,1.318-0.188,1.892-0.555c1.002-0.645,1.608-1.754,1.608-2.945 V180.445C187.735,179.076,186.936,177.831,185.689,177.261z" fill="currentColor"></path><path d="M389.24,95.74c-1.002-0.644-2.264-0.732-3.347-0.238l-178.876,81.76c-1.246,0.57-2.045,1.814-2.045,3.185v208.751 c0,1.191,0.606,2.302,1.608,2.945c0.572,0.367,1.23,0.555,1.892,0.555c0.495,0,0.991-0.104,1.455-0.315l178.876-81.768 c1.246-0.568,2.045-1.813,2.045-3.185V98.685C390.849,97.494,390.242,96.384,389.24,95.74z" fill="currentColor"></path><path d="M372.915,80.216c-0.009-1.377-0.823-2.621-2.082-3.18l-60.182-26.681c-0.938-0.418-2.013-0.399-2.938,0.045 l-173.755,82.992l60.933,29.117c0.462,0.211,0.958,0.316,1.455,0.316s0.993-0.105,1.455-0.316l173.066-79.092 C372.122,82.847,372.923,81.593,372.915,80.216z" fill="currentColor"></path></svg>';
                    svg.outerHTML = newSvg;
                    btn.classList.add('svg-modified');
                }
            }
        }

        // Наблюдатель за изменениями DOM для динамической подмены
        var observer = new MutationObserver(function() {
            applyDynamicModifications();
        });
        observer.observe(document.body, { childList: true, subtree: true });

    } catch (e) {
        console.log('Plugin Init Error', e);
    }
})();

(function () {
    'use strict';

    function startPlugin() {
        // --- ЧАСТЬ 1: НАСТРОЙКИ LAMPA (Storage) ---
        
        // Преднастройки Lampa
        Lampa.Storage.set('start_page', 'main');
        Lampa.Storage.set('source', 'SURS');
        Lampa.Storage.set('glass_style', true);
		Lampa.Storage.set('glass_opacity', 'easy');
        Lampa.Storage.set('video_quality_default', '1080');
		Lampa.Storage.set('interface_size', 'small');
		Lampa.Storage.set('keyboard_type', 'integrate');
		// Lampa.Storage.set('background', true);
		// Lampa.Storage.set('background_type', 'simple');
		// Lampa.Storage.set('black_style', true);

        // Настраиваем плагин Online Mod
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        Lampa.Storage.set('online_mod_balanser', 'rezka2');
        Lampa.Storage.set('online_mod_save_last_balanser', true);
        Lampa.Storage.set('online_mod_full_episode_title', true);
        Lampa.Storage.set('online_mod_rezka2_fix_stream', true);
        // Lampa.Storage.set('online_mod_proxy_rezka2', false);

        // Настраиваем плагин Applecation
		Lampa.Storage.set('applecation_text_scale', '120');
		Lampa.Storage.set('applecation_spacing_scale', '90');
        Lampa.Storage.set('applecation_show_ratings', true);
        Lampa.Storage.set('applecation_ratings_source', 'builtin');
        Lampa.Storage.set('applecation_mdblist_api_key', 'wf3lktoy7sbbjrcnmf8g9omsw');
        Lampa.Storage.set('applecation_enabled_ratings', '["tmdb","imdb","tomatoes","popcorn","metacritic","letterboxd","trakt"]');
        Lampa.Storage.set('applecation_show_episode_count', true);

        // Настраиваем кнопки на странице фильма в плагине LME Movie Enhancer
        Lampa.Storage.set('lme_showbutton', true);
        Lampa.Storage.set('lme_buttonhide', '["view--trailer","view--online","button--reaction","button--subscribe","button--options"]');
        Lampa.Storage.set('lme_buttonsort', '["view--online_mod","view--torrent","view--rutube_trailer","button--book"]');

        // Скрываем и сортируем пункты меню
        Lampa.Storage.set('menu_hide', '["Подборки","Каталог","Лента","Фильмы","Мультфильмы","Сериалы","Персоны","Релизы","Аниме","Подписки","Расписание","Торренты","Спорт","Для детей","Shots","Torrent Manager"]');
        Lampa.Storage.set('menu_sort', '["Поиск","Главная","Избранное","История","Фильтр"]');


        // --- ЧАСТЬ 2: CSS ИНЪЕКЦИЯ ---
        
        var css = '';

        // Блок 1: Старые стили (Скрытие элементов шапки и меню)
        css += '.head .head__logo-icon, .head .open--search, .head .open--settings, .head .time--clock + div, .head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon {display: none !important;} ';
        
        css += '.menu li.menu__item[data-action="streaming"], .menu li.menu__item[data-action="catalog"], .menu li.menu__item[data-action="feed"], .menu li.menu__item[data-action="movie"], .menu li.menu__item[data-action="cartoon"], .menu li.menu__item[data-action="tv"], .menu li.menu__item[data-action="myperson"], .menu li.menu__item[data-action="relise"], .menu li.menu__item[data-action="anime"], .menu li.menu__item[data-action="subscribes"], .menu li.menu__item[data-action="timetable"], .menu li.menu__item[data-action="mytorrents"], .menu li.menu__item[data-action="kids"], .menu li.menu__item:not([data-action]) {display: none !important;} ';
        css += '.menu .menu__split, .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;} ';
        
        // Корректировка контейнера слева (из старого кода)
        css += '.wrap__left .scroll__content {display: flex; flex-direction: column; min-height: 100vh;} .wrap__left .scroll__body {margin-top: auto; margin-bottom: auto;} ';
        css += '.head__title {visibility: hidden;} ';

        // Блок 2: НОВЫЕ СТИЛИ (добавлены через шаблонную строку для удобства)
        css += `
.head, .head .open--profile, .head .head__backward, .head .head__menu-icon, .head .head__title, .head .head__markers, .head .head__time {
	display: none;
}

.wrap__left {
	padding: 0;
}

.scroll--mask {
	height: 100vh !important;
}

.wrap__content {
	padding: 0 !important;
}
.wrap__content .applecation .activity__body {
	margin-top: 4em !important;
}

.wrap__content .activity__body > div > div {
	padding: 1em 2em !important;
}

/*.full-start-new {
    padding-left: 3em;
}*/

/*.activitys .scroll--mask .items-line {
    padding: 2em 2em;
    transition: padding 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}*/
/*.menu--open .activitys .scroll--mask .items-line {
    padding-left: 3em;
}*/

/*.activitys .scroll--mask {
  --fade-size-horz: 40px;
  --mask-horz: linear-gradient(to right, transparent 0px, black var(--fade-size-horz), black 100%);
  --fade-size-vert: 40px;
  --mask-vert: linear-gradient(to bottom, transparent 0px, black var(--fade-size-vert), black calc(100% - var(--fade-size-vert)), transparent 100%);
  -webkit-mask-image: var(--mask-horz), var(--mask-vert);
  -webkit-mask-composite: source-in;
  mask-image: var(--mask-horz), var(--mask-vert);
  mask-composite: intersect;
}*/

.items-line__head {
    margin-top: 3.5em;
}

.scroll--horizontal .scroll__content {
    margin-top: 0.5em;
}

/* Основные переменные для легкой настройки */
:root {
    --menu-bg: rgba(20, 20, 23, 0.75); /* Полупрозрачный темный фон */
    --menu-bg-hover: rgba(20, 20, 23, 0.95); /* Более плотный фон при открытии */
    --menu-width-collapsed: 72px;
    --menu-width-expanded: 200px;
    --accent-color: #e50914; /* Красный акцент (как на Netflix) или белый */
    --text-color: #e8e8e8;
    --text-color-active: #ffffff;
    --blur-strength: 10px;
    --transition-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Блок, отвечающий за позиционирование (плавающий) */

/*.wrap__left .scroll__body {
    zwidth: auto !important;
    zposition: absolute !important;
    zleft: 20px;
    zleft: 0;
    ztop: 50%;
    ztransform: translateY(-50%);
    zz-index: 1000;
    pointer-events: none;
}*/

/*.wrap__left .scroll--mask {
    mask-image: unset;
    overflow: visible;
}*/

/* Сам контейнер меню */
.menu {
    pointer-events: auto; /* Возвращаем клики самому меню */
    border-radius: 24px;
    border-radius: 0 24px 24px 0;
    transition: width var(--transition-speed), background var(--transition-speed);
    display: flex;
    flex-direction: column;
    padding: 15px 0;
}

/* Списки внутри меню */
/*.menu__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px; /* Отступ между элементами */
}*/

/* Элемент меню */
.menu__item {
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 24px; /* Отступы по бокам */
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    white-space: nowrap; /* Текст не переносится */
    background: transparent;
    border-radius: 1em;
}

/* Ховер эффект и активное состояние */
.menu__item:hover,
.menu__item.active,
.menu__item.focus {
    color: var(--text-color-active);
    background: rgba(255, 255, 255, 0.12); /* Легкая подсветка фона */
    zbox-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

/* Акцентная полоска слева при наведении (индикатор) */
.menu__item::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background-color: var(--accent-color);
    border-radius: 0 4px 4px 0;
    transition: height 0.2s ease;
    box-shadow: 0 0 10px var(--accent-color);
}

.menu__item.active::before,
.menu__item.focus::before {
    height: 60%; /* Полоска вырастает */
}

/* Иконки */
.menu__ico {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px; /* Фиксированная ширина для выравнивания */
    height: 24px;
    margin-right: 20px; /* Расстояние до текста */
}

.menu__item.focus .menu__ico svg > * {
    width: 24px;
    height: 24px;
    stroke: currentColor !important;
    transition: transform 0.2s;
}

.menu__item.focus .menu__ico svg path {
    fill: currentColor !important;
}

/* Анимация иконки при наведении */
.menu__item:hover .menu__ico svg {
    transform: scale(1.1);
}

/* Текст меню */
.menu__text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: 500;
    transform: translateX(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Разделитель секций */
.menu__split {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 24px;
    width: calc(100% - 48px);
}

.head__body {
    padding: 0 !important;
}
/*.menu--open .head .open--profile {
    margin: 29px; !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}
.head .open--profile img {
    height: 100% !important;
    width: 100% !important;
}*/

.card .card__view::before,
.card .card__view::before,
.card-episode .full-episode::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 0 !important;
    border-radius: 1em;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: opacity;
    z-index: 2;
    box-shadow: inset 2px 2px 1px rgba(255, 255, 255, 0.30), inset -2px -2px 2px rgba(255, 255, 255, 0.30);
    background: radial-gradient(circle at center, transparent 58%, rgba(255, 255, 255, 0.22) 75%, rgba(255, 255, 255, 0.38) 90%), radial-gradient(120% 85% at 18% 10%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.10) 38%, transparent 62%);
    mix-blend-mode: screen;
}

.card .card__view::after,
.card .card__view::after,
.card-episode .full-episode::after {
    display: none;
}

.card.focus .card__view::before,
.card.hover .card__view::before,
.card-episode.focus .full-episode::before {
    opacity: 1;
}

/*.card .card__view, .card-episode .full-episode {
    transition: all 0.1s linear;
}*/

.card.focus,
.card-episode.focus {
    transform: scale(1.08) translateY(-6px) !important;
    z-index: 10;
}

.card,
.card-episode {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: transform;
    -webkit-animation: none !important;
    animation: none !important;
}

.card.focus .card__view,
.card.hover .card__view,
.card-episode.focus .full-episode {
    position: relative !important;
    border-radius: 1em !important;
    Zoverflow: hidden !important;
    background: rgba(255, 255, 255, 0.05) !important;
    flex-shrink: 0 !important;
    transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: transform, box-shadow, backdrop-filter;
    -webkit-animation: none !important;
    animation: none !important;
}

.card .card__view,
.card-episode .full-episode {
    animation: none !important;
    margin-bottom: 1em;
    zmargin-top: 1em;
}

.card__type, .card__quality {
    z-index: 2;
}
        `;

        // Применение стилей
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        
        var target = document.head || document.getElementsByTagName('head')[0] || document.body;
        if (target) {
            target.appendChild(style);
            console.log('My Config: CSS стили успешно внедрены');
        } else {
            console.log('My Config: Ошибка - некуда внедрить CSS');
        }


        // --- ЧАСТЬ 3: КНОПКА ПОИСКА В МЕНЮ ---
        
        // SVG иконка лупы
        var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
        
        // Создаем элемент меню
        var searchItem = $('<li class="menu__item selector" data-action="search_button"><div class="menu__ico">' + icon + '</div><div class="menu__text">Поиск</div></li>');

        // Навешиваем событие
        searchItem.on('hover:enter', function () {
            // Находим оригинальную кнопку поиска в шапке (она скрыта CSS, но существует)
            var originalSearch = $('.head .open--search');
            
            if (originalSearch.length) {
                // Эмулируем нажатие на оригинальную кнопку
                originalSearch.trigger('hover:enter');
            } else {
                // Резервный метод
                if (Lampa.Search) Lampa.Search.open();
            }
        });

        // Добавляем кнопку в меню
        $('.menu .menu__list').eq(0).append(searchItem);
        
        console.log('My Config: Кнопка поиска добавлена');
    }

    // Запуск скрипта после готовности приложения
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }

})();

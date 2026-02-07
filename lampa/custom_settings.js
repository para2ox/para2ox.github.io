(function () {
    'use strict';

    function startPlugin() {
        // --- ЧАСТЬ 1: НАСТРОЙКИ LAMPA (Storage) ---
        
        // Преднастройки Lampa
        Lampa.Storage.set('start_page', 'main');
        Lampa.Storage.set('source', 'SURS');
        Lampa.Storage.set('glass_style', true);
        Lampa.Storage.set('video_quality_default', '1080');

        // Настраиваем плагин Online Mod
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        Lampa.Storage.set('online_mod_balanser', 'rezka2');
        Lampa.Storage.set('online_mod_save_last_balanser', true);
        Lampa.Storage.set('online_mod_full_episode_title', true);
        Lampa.Storage.set('online_mod_rezka2_fix_stream', true);
        // Lampa.Storage.set('online_mod_proxy_rezka2', false);

        // Настраиваем плагин Applecation
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

        // Блок 1: Элементы шапки (скрытие)
        css += '.head .head__logo-icon, .head .open--search, .head .open--settings, .head .time--clock + div, .head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon {display: none !important;} ';

        // Блок 2: Элементы меню (скрытие)
        css += '.menu li.menu__item[data-action="streaming"], .menu li.menu__item[data-action="catalog"], .menu li.menu__item[data-action="feed"], .menu li.menu__item[data-action="movie"], .menu li.menu__item[data-action="cartoon"], .menu li.menu__item[data-action="tv"], .menu li.menu__item[data-action="myperson"], .menu li.menu__item[data-action="relise"], .menu li.menu__item[data-action="anime"], .menu li.menu__item[data-action="subscribes"], .menu li.menu__item[data-action="timetable"], .menu li.menu__item[data-action="mytorrents"], .menu li.menu__item[data-action="kids"], .menu li.menu__item:not([data-action]) {display: none !important;} ';
        css += '.menu .menu__split, .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;} ';
        css += '.wrap__left .scroll__content {display: flex; flex-direction: column; min-height: 100vh;} .wrap__left .scroll__body {margin-top: auto; margin-bottom: auto;} ';

        // Блок 3: Заголовок шапки (видимость)
        css += '.head__title {visibility: hidden;} ';

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
        // Используем prepend, чтобы попытаться поставить её выше, или append как в оригинале
        // (Lampa сама отсортирует по menu_sort, так как там указан "Поиск")
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

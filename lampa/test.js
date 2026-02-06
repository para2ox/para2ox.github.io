(function () {
    'use strict';

    function addSearchButton() {
        // SVG иконка лупы (Поиск)
        var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
        
        // Создаем элемент меню
        // data-action="search_button" — уникальный ID действия
        var item = $('<li class="menu__item selector" data-action="search_button"><div class="menu__ico">' + icon + '</div><div class="menu__text">Поиск</div></li>');

        // Навешиваем событие (работает и на клик мышкой, и на OK пульта)
        item.on('hover:enter', function () {
            // Находим оригинальную кнопку поиска в шапке (даже если она скрыта через CSS)
            var originalSearch = $('.head .open--search');
            
            if (originalSearch.length) {
                // Эмулируем нажатие на оригинальную кнопку
                originalSearch.trigger('hover:enter');
            } else {
                // Резервный метод: прямой вызов поиска Lampa, если кнопка в шапке не найдена
                if (Lampa.Search) Lampa.Search.open();
            }
        });

        // Добавляем кнопку в общий список меню
        // Она добавится в конец, но ваш первый скрипт (menu_sort) переместит её куда нужно,
        // так как текст внутри "Поиск" совпадает с вашим конфигом.
        $('.menu .menu__list').eq(0).append(item);
    }

    if (window.appready) {
        addSearchButton();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') addSearchButton();
        });
    }
})();

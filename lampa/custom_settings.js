(function () {
    'use strict';

    function applySettings() {
        // --- CSS ИНЪЕКЦИЯ ---
        
        // Добавлены скрытия: разделителей, настроек, консоли, редактирования
        var css = '.open--premium, .open--feed, .notice--icon, .open--broadcast, .full--screen, .m-reload-screen, .black-friday__button, .menu .menu__split, .menu li.menu__item[data-action="settings"], .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;}';

        var style = document.createElement('style');
        style.type = 'text/css';
        
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        
        // Пытаемся добавить в head, если нет - в body
        var target = document.head || document.getElementsByTagName('head')[0] || document.body;
        if (target) {
            target.appendChild(style);
            console.log('My Config: CSS стили успешно внедрены');
        } else {
            console.log('My Config: Ошибка - некуда внедрить CSS');
        }
    }

    if (window.appready) {
        applySettings();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') applySettings();
        });
    }

})();

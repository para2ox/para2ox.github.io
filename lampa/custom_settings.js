(function() {
    'use strict';

    function applySettings() {
        // Авторизация в HDrezka
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        
        // Ставим HDrezka балансером по умолчанию
        Lampa.Storage.set('online_mod_balanser', 'rezka2');
        
        // Включаем сохранение последнего балансера
        Lampa.Storage.set('online_mod_save_last_balanser', true);
        
        // Включаем отображение полного названия эпизода
        Lampa.Storage.set('online_mod_full_episode_title', true);
        
        // Фикс видеопотока (важно для некоторых провайдеров)
        Lampa.Storage.set('online_mod_rezka2_fix_stream', true);
        
        // (bullshit?) Включаем проксирование для Rezka. БЕЗ ЭТОГО куки не отправятся на TV/PC, так как браузер блокирует заголовок Cookie
        // Lampa.Storage.set('online_mod_proxy_rezka2', true);

        //////

        // Скрываем лишние пункты в боковом меню
        Lampa.Storage.set('menu_hide', '["Лента","Фильмы","Мультфильмы","Сериалы","Персоны","Релизы","Аниме","Подписки","Расписание","Торренты","Спорт","Для детей","Информация","Консоль"]');
    }

    if (window.appready) {
        applySettings();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') applySettings();
        });
    }
})();

(function() {
    'use strict';

    function applySettings() {
        // ВАЖНО: Передаем true/false как boolean (без кавычек), а не как строки.
        
        // Включаем отображение полного названия эпизода
        Lampa.Storage.set('online_mod_full_episode_title', true);
        
        // Отключаем сохранение последнего балансера
        Lampa.Storage.set('online_mod_save_last_balanser', true);
        
        // Фикс видеопотока (важно для некоторых провайдеров)
        Lampa.Storage.set('online_mod_rezka2_fix_stream', true);
        
        // Включаем проксирование для Rezka
        // БЕЗ ЭТОГО куки не отправятся на TV/PC, так как браузер блокирует заголовок Cookie
        Lampa.Storage.set('online_mod_proxy_rezka2', true);
        
        // Установка куки (строка остается строкой)
        // Убедитесь, что эти куки свежие и получены с того же IP, с которого смотрите
        Lampa.Storage.set('online_mod_rezka2_cookie', 'dle_user_id=38372; dle_password=d8efa0170ea646402578694fe9ccf72e; dle_newpm=0; dle_user_token=cadfee4517c32230654c3c64a6002b0a; dle_user_taken=1');
        
        // Параметра 'online_mod_rezka2_status' в коде нет, он не нужен.
        
        console.log('My Config: Настройки HDRezka успешно применены');
    }

    if (window.appready) {
        applySettings();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') applySettings();
        });
    }
})();

(function () {
    console.log("🔥 Advanced AdBlock: Инициализация перехвата сети...");

    // 1. КОНСТАНТЫ: Что именно мы блокируем (паттерны из вашего запроса)
    const BLOCKED_PATHS = [
        '/api/metric/stat',
        '/api/ad/stat',
        'method=ad_preroll',
        'method=vast'
    ];

    function isBlocked(url) {
        if (!url) return false;
        // Проверяем, содержит ли URL запрещенные куски
        return BLOCKED_PATHS.some(path => url.includes(path));
    }

    // 2. ПЕРЕХВАТ XMLHttpRequest (Старый добрый AJAX)
    // Большинство плееров используют его для загрузки рекламы
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
        // Сохраняем URL для проверки в методе send (или блокируем сразу тут)
        this._requestUrl = url;
        
        if (isBlocked(url)) {
            console.warn(`🚫 XHR Blocked: ${url}`);
            // Подменяем URL на заглушку или просто прерываем реальное открытие, 
            // но чтобы не вызвать ошибку JS, даем "пустой" URL, который вернет 404 быстро
            return originalOpen.call(this, method, "about:blank"); 
        }
        return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (data) {
        if (isBlocked(this._requestUrl)) {
            console.log(`🔪 XHR Request Killed: ${this._requestUrl}`);
            
            // Эмулируем успешный, но пустой ответ, чтобы плеер думал "рекламы нет"
            // вместо "ошибка сети", что может вызвать повторную попытку
            Object.defineProperty(this, 'readyState', { value: 4 });
            Object.defineProperty(this, 'status', { value: 200 });
            Object.defineProperty(this, 'responseText', { value: "{}" });
            
            // Вызываем события завершения
            if (this.onreadystatechange) this.onreadystatechange();
            if (this.onload) this.onload();
            
            return; // Не отправляем реальный запрос
        }
        return originalSend.apply(this, arguments);
    };

    // 3. ПЕРЕХВАТ FETCH (Современный метод запросов)
    const originalFetch = window.fetch;
    window.fetch = async function (input, init) {
        let url = input;
        if (input instanceof Request) {
            url = input.url;
        }

        if (isBlocked(url)) {
            console.warn(`🚫 Fetch Blocked: ${url}`);
            // Возвращаем пустой JSON ответ
            return new Response("{}", {
                status: 200, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }
        
        return originalFetch.apply(this, arguments);
    };

    // 4. ЖЕСТКАЯ ПОДМЕНА ПРЕМИУМА
    // Используем Object.defineProperty, чтобы сайт не мог перезаписать это значение
    try {
        let fakeAccount = { hasPremium: () => true };
        
        if (window.Account) {
            Object.assign(window.Account, fakeAccount);
        } else {
            Object.defineProperty(window, 'Account', {
                get: () => fakeAccount,
                set: (val) => { 
                    console.log("🛡️ Сайт пытался перезаписать Account, но мы запретили.");
                    // Можно разрешить запись, но мержить свойства, 
                    // но чаще лучше просто игнорировать или мержить вручную
                    if(val) Object.assign(fakeAccount, val); 
                },
                configurable: false
            });
        }
    } catch (e) {
        console.log("Ошибка подмены аккаунта:", e);
    }

    console.log("✅ Сетевой экран установлен. Рекламные запросы будут убиты до вылета.");

})();

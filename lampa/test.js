(function () {
    console.log("🔥 Advanced AdBlock & Cleaner: Инициализация...");

    // 1. КОНСТАНТЫ: Список блокировки
    // Мы ищем частичное совпадение, поэтому http/https не важен
    const BLOCKED_PATHS = [
        '/api/metric/stat',
        '/api/ad/stat',
        'method=ad_preroll',
        'method=vast',
        'lampa.mx/img/video_poster.png' // <-- Добавлено блокирование постера
    ];

    function isBlocked(url) {
        if (!url) return false;
        return BLOCKED_PATHS.some(path => url.includes(path));
    }

    // 2. ПЕРЕХВАТ XMLHttpRequest (AJAX)
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
        this._requestUrl = url;
        if (isBlocked(url)) {
            console.warn(`🚫 XHR Blocked: ${url}`);
            return originalOpen.call(this, method, "about:blank");
        }
        return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (data) {
        if (isBlocked(this._requestUrl)) {
            console.log(`🔪 XHR Request Killed: ${this._requestUrl}`);
            // Эмулируем пустой успешный ответ
            Object.defineProperty(this, 'readyState', { value: 4 });
            Object.defineProperty(this, 'status', { value: 200 });
            Object.defineProperty(this, 'responseText', { value: "{}" });
            
            if (this.onreadystatechange) this.onreadystatechange();
            if (this.onload) this.onload();
            return;
        }
        return originalSend.apply(this, arguments);
    };

    // 3. ПЕРЕХВАТ FETCH API
    const originalFetch = window.fetch;
    window.fetch = async function (input, init) {
        let url = input;
        if (input instanceof Request) {
            url = input.url;
        }

        if (isBlocked(url)) {
            console.warn(`🚫 Fetch Blocked: ${url}`);
            return new Response("{}", {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return originalFetch.apply(this, arguments);
    };

    // 4. DOM НАБЛЮДАТЕЛЬ (Для картинок и постеров)
    // Это удаляет постер, даже если он прописан в HTML теге <video poster="...">
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Проверка добавленных узлов
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType !== 1) return; // Пропускаем текстовые узлы

                    // Проверка тегов <video> и <img>
                    if ((node.tagName === 'VIDEO' && node.getAttribute('poster') && isBlocked(node.getAttribute('poster'))) ||
                        (node.tagName === 'IMG' && node.src && isBlocked(node.src))) {
                        
                        console.log("🚫 Visual Element Blocked via Observer");
                        node.removeAttribute('poster');
                        node.src = "";
                        node.style.display = 'none'; // Скрываем визуально
                    }
                });
            }
            // Проверка изменения атрибутов (если скрипт сайта попытается вернуть постер)
            if (mutation.type === 'attributes' && (mutation.attributeName === 'poster' || mutation.attributeName === 'src')) {
                const node = mutation.target;
                const val = node.getAttribute(mutation.attributeName);
                if (isBlocked(val)) {
                    console.log("🚫 Attribute Update Blocked");
                    node.removeAttribute(mutation.attributeName);
                }
            }
        });
    });

    // Запускаем слежку за всем документом
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['poster', 'src']
    });

    // 5. ЖЕСТКАЯ ПОДМЕНА ПРЕМИУМА
    try {
        let fakeAccount = { hasPremium: () => true };
        
        if (window.Account) {
            Object.assign(window.Account, fakeAccount);
        } else {
            Object.defineProperty(window, 'Account', {
                get: () => fakeAccount,
                set: (val) => { 
                    if(val) Object.assign(fakeAccount, val); 
                },
                configurable: false
            });
        }
    } catch (e) {
        console.log("Ошибка подмены аккаунта:", e);
    }

    // 6. CSS (Финальная зачистка)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Скрываем рекламные блоки */
        .ad-container, [id^="yandex_rtb"], .vast-block { display: none !important; }
    `;
    document.head.appendChild(style);

    console.log("✅ Full Protection Active (Network + DOM)");
})();

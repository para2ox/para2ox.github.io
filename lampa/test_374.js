(function () {
    'use strict';
    console.log("[Phobos AdBlock] Ядро подавления рекламы v3 активировано");

    // 1. Подменяем проверку подписки
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

    // 2. Инъекция CSS (на случай, если Observer не успеет на слабом ТВ)
    function injectCSS() {
        if (document.getElementById('phobos-adblock-css')) return;
        var style = document.createElement('style');
        style.id = 'phobos-adblock-css';
        style.innerHTML = `
            .ad-preroll, .ad-video-block, .player-video__ad, .player-ad,
            .ad-server, .ad-layer, .player-panel__ad, .ad-container, .ad-block, [data-ad] {
                display: none !important; 
                opacity: 0 !important; 
                visibility: hidden !important; 
                width: 0 !important; 
                height: 0 !important;
                pointer-events: none !important;
            }
        `;
        // Добавляем к documentElement, чтобы выжить при очистке <head>
        (document.head || document.documentElement).appendChild(style);
    }
    injectCSS();

    // 3. Активное уничтожение узлов через MutationObserver
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Если SPA очистил стили при рендеринге страницы фильма — возвращаем их
            if (mutation.removedNodes.length > 0) {
                for (var i = 0; i < mutation.removedNodes.length; i++) {
                    if (mutation.removedNodes[i].id === 'phobos-adblock-css') {
                        injectCSS();
                    }
                }
            }

            // Проверяем новые добавленные узлы
            if (mutation.addedNodes.length > 0) {
                for (var j = 0; j < mutation.addedNodes.length; j++) {
                    var node = mutation.addedNodes[j];
                    if (node.nodeType === 1) { // Убеждаемся, что это HTML-элемент
                        
                        // Сценарий А: Сам добавленный узел является рекламой
                        var className = (node.className && typeof node.className === 'string') ? node.className : '';
                        if (className.indexOf('ad-preroll') !== -1 || className.indexOf('ad-video-block') !== -1 || className.indexOf('player-video__ad') !== -1) {
                            node.remove();
                            console.log('[Phobos AdBlock] Цель уничтожена на подлете:', className);
                            continue;
                        }

                        // Сценарий Б: Реклама лежит глубоко внутри добавленного куска разметки
                        if (node.querySelectorAll) {
                            var ads = node.querySelectorAll('.ad-preroll, .ad-video-block, .player-video__ad');
                            if (ads.length > 0) {
                                for (var k = 0; k < ads.length; k++) {
                                    ads[k].remove();
                                }
                                console.log('[Phobos AdBlock] Вложенные рекламные узлы зачищены');
                            }
                        }
                    }
                }
            }
        });
    });

    // Запускаем наблюдение за всем документом с максимальным приоритетом
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // 4. Прокси для обмана логики плеера (остается без изменений)
    var originalCreateElement = document.createElement;
    document.createElement = new Proxy(originalCreateElement, {
        apply: function(target, thisArg, args) {
            if (args[0] === "video") {
                var fakeVideo = target.apply(thisArg, args);
                fakeVideo.play = function () {
                    setTimeout(function() {
                        fakeVideo.ended = true;
                        fakeVideo.dispatchEvent(new Event("ended")); 
                    }, 10);
                };
                return fakeVideo;
            }
            return target.apply(thisArg, args);
        }
    });
})();

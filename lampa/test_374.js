(function () {
    'use strict';
    console.log("Блокировка рекламы v2: Активирована");

    // 1. ПРЕВЕНТИВНЫЙ УДАР (CSS-инъекция)
    // Скрываем рекламные контейнеры на уровне движка рендеринга до того, как они появятся
    var style = document.createElement('style');
    style.innerHTML = `
        .player-video__ad,
        .player-ad,
        .ad-server,
        .ad-layer,
        .player-panel__ad,
        .ad-container,
        .ad-block,
        [data-ad] {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
            z-index: -1 !important;
            position: absolute !important;
            left: -9999px !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Подменяем проверку подписки (премиум аккаунт)
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

    // 3. Ломаем создание <video> для рекламы (Оставляем логику для обмана плеера)
    var originalCreateElement = document.createElement;
    document.createElement = new Proxy(originalCreateElement, {
        apply(target, thisArg, args) {
            if (args[0] === "video") {
                var fakeVideo = target.apply(thisArg, args);

                // Запрещаем рекламе воспроизводиться и мгновенно триггерим конец
                fakeVideo.play = function () {
                    // Снизили таймаут с 500ms до 10ms для мгновенного закрытия "под капотом"
                    setTimeout(() => {
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

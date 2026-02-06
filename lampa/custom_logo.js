function pluginSauronLogo(){
    function add(){
        // Создаем HTML контейнер с картинкой (PNG)
        // Используем класс head__logo-icon для сохранения базового поведения Lampa
        // И добавляем свой класс head__logo-sauron для стилизации
        let logo = $(`<div class="head__logo-icon head__logo-sauron">
            <img src="https://para2ox.github.io/lampa/sauron.png" alt="Sauron Logo">
        </div>`);

        // Добавляем стили, чтобы картинка была адекватного размера.
        // 'height: 2.3em' - это высота стандартного лого Lampa.
        // 'width: auto' сохраняет пропорции картинки.
        $('body').append(`<style>
            .head__logo-sauron img {
                height: 2.3em;
                width: auto;
                display: block;
                /* Опционально: можно добавить небольшой отступ, если нужно */
                /* margin-top: 0.1em; */
            }
        </style>`);

        // Заменяем оригинальную иконку на нашу новую
        $('.head .head__logo-icon').replaceWith(logo);

        // Восстанавливаем функционал клика для открытия меню
        logo.on('mousedown', ()=>{
            Lampa.Menu.toggle()
        })
    }

    // Стандартная проверка готовности приложения Lampa
    if(window.appready) add()
    else{
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') add()
        })
    }
}

// Защита от повторного запуска плагина
if(!window.plugin_sauron_ready) {
    window.plugin_sauron_ready = true;
    pluginSauronLogo();
}

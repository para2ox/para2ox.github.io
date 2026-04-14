(function () {
    'use strict';

    // =======================================================
    // ИЗМЕНЕНИЕ 1: МГНОВЕННАЯ ИНЪЕКЦИЯ СТИЛЕЙ
    // Вынесено за пределы startPlugin, чтобы убрать мигание
    // =======================================================
    var css = '';

    // Блок 1: Старые стили (Скрытие элементов шапки и меню)
    css += '.head .head__logo-icon, .head .open--search, .head .open--settings, .head .time--clock + div, .head .open--premium, .head .open--feed, .head .notice--icon, .head .open--broadcast, .head .full--screen, .head .m-reload-screen, .head .black-friday__button, .head .torrent-manager-icon {display: none !important;} ';
    css += '.menu li.menu__item[data-action="streaming"], .menu li.menu__item[data-action="catalog"], .menu li.menu__item[data-action="feed"], .menu li.menu__item[data-action="movie"], .menu li.menu__item[data-action="cartoon"], .menu li.menu__item[data-action="tv"], .menu li.menu__item[data-action="myperson"], .menu li.menu__item[data-action="relise"], .menu li.menu__item[data-action="anime"], .menu li.menu__item[data-action="subscribes"], .menu li.menu__item[data-action="timetable"], .menu li.menu__item[data-action="mytorrents"], .menu li.menu__item[data-action="kids"], .menu li.menu__item:not([data-action]) {display: none !important;} ';
    css += '.menu .menu__split, .menu li.menu__item[data-action="about"], .menu li.menu__item[data-action="console"], .menu li.menu__item[data-action="edit"] {display: none !important;} ';
    
    // Корректировка контейнера слева (из старого кода)
    css += '.wrap__left .scroll__content {display: flex; flex-direction: column; min-height: 100vh;} .wrap__left .scroll__body {margin-top: auto; margin-bottom: auto;} ';
    css += '.head__title {visibility: hidden;} ';

    // Блок 2: НОВЫЕ СТИЛИ
    css += `
.head, .head .open--profile, .head .head__backward, .head .head__menu-icon, .head .head__title, .head .head__markers, .head .head__time {
    display: none;
}

.wrap__left {
    padding: 0;
}

.wrap__content {
    padding: 0 !important;
}
/*.wrap__content .applecation .activity__body {
    margin-top: 4em !important;
}*/
.wrap__content .applecation .activity__body .full-start__background {
    margin-top: 4em !important;
}
.wrap__content .applecation.full-start-new {
    margin-bottom: 8em;
}
.wrap__content .applecation.full-start-new .full-start-new__right {
    margin-bottom: -4em;
}

.wrap__content .activity__body > div > div {
    padding: 1em 2em !important;
}
.new-interface-info__body {
    padding: 0.2em 1.5em 0 !important;
}

.full-start-new__buttons {
    padding-top: 1em;
}

.items-line__head {
    margin-top: 3.5em;
}

.scroll--horizontal .scroll__content {
    margin-top: 0.5em;
}

.new-interface-info__body:not(:has(.visible)) {
    display: none;
}

/* Основные переменные для легкой настройки */
:root {
    --menu-bg: rgba(20, 20, 23, 0.75);
    --menu-bg-hover: rgba(20, 20, 23, 0.95);
    --menu-width-collapsed: 72px;
    --menu-width-expanded: 200px;
    --accent-color: #e50914; 
    --text-color: #e8e8e8;
    --text-color-active: #ffffff;
    --blur-strength: 10px;
    --transition-speed: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Сам контейнер меню */
.menu {
    pointer-events: auto;
    border-radius: 24px;
    border-radius: 0 24px 24px 0;
    transition: width var(--transition-speed), background var(--transition-speed);
    display: flex;
    flex-direction: column;
    padding: 15px 0;
}

/* Элемент меню */
.menu__item {
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 24px;
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    white-space: nowrap;
    background: transparent;
    border-radius: 1em;
}

/* Ховер эффект и активное состояние */
.menu__item:hover,
.menu__item.active,
.menu__item.focus {
    color: var(--text-color-active);
    background: rgba(255, 255, 255, 0.12);
    zbox-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

/* Акцентная полоска слева при наведении */
.menu__item::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background-color: var(--accent-color);
    border-radius: 0 4px 4px 0;
    transition: height 0.2s ease;
    box-shadow: 0 0 10px var(--accent-color);
}

.menu__item.active::before,
.menu__item.focus::before {
    height: 60%;
}

/* Иконки */
.menu__ico {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    margin-right: 20px;
}

.menu__item.focus .menu__ico svg > * {
    width: 24px;
    height: 24px;
    stroke: currentColor !important;
    transition: transform 0.2s;
}

.menu__item.focus .menu__ico svg path {
    fill: currentColor !important;
}

/* Анимация иконки при наведении */
.menu__item:hover .menu__ico svg {
    transform: scale(1.1);
}

/* Текст меню */
.menu__text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: 500;
    transform: translateX(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Разделитель секций */
.menu__split {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);

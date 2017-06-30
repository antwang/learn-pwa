(function () {
    'use strict';
    var btnMenu = document.querySelector('.header__icon');
    var menu = document.querySelector('.menu');
    var overlay = document.querySelector('.menu__overlay');
    btnMenu.addEventListener('click', showMenu, false);
    overlay.addEventListener('click', hideMenu, false);
    function showMenu () {
        menu.classList.add('menu--show')
        overlay.classList.add('menu__overlay--show')
    }
    function hideMenu () {
        menu.classList.remove('menu--show')
        overlay.classList.remove('menu__overlay--show')
    }
})()
import $ from 'jquery';

import './polyfills';

import Preload from './components/preload';

import Fancybox from './components/fancybox';

import LazyLoad from './components/lazyLoad';

import Swiper from './components/swiper';

import Tooltip from './components/tooltip';

import Phone from './components/phone';

import Select from './components/select';

import Accordion from './components/accordion';

import Tabs from './components/tabs';

window.$ = window.jQuery = $;

$(function () {
    new Preload('[data-preload]');

    const fancybox = new Fancybox('[data-fancybox]');

    $.fn.modal = fancybox.open;
    $.fn.modalClose = fancybox.close;

    new LazyLoad('[data-src], [data-background-image]');

    new Swiper('[data-swiper]', {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    new Tooltip('[data-tooltip]');

    new Phone('[data-phone]');

    new Select('[data-select]');

    new Accordion('[data-accordion]');

    new Tabs('[data-tabs]');

    $('.header__burger').on('click', function (e) {
        e.preventDefault();

        $('.header').toggleClass('is-active');
        $('body').toggleClass('no-scroll');
    });
});

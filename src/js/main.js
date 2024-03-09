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

$(function() {
    new Preload('[data-preload]');

    new Fancybox('[data-fancybox]');

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
});
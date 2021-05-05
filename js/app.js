function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}
if (isIE()) {
    document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
    document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support === true) {
        document.querySelector('html').classList.add('_webp');
    } else {
        document.querySelector('html').classList.add('_no-webp');
    }
});

function ibg() {
    if (isIE()) {
        let ibg = document.querySelectorAll("._ibg");
        for (var i = 0; i < ibg.length; i++) {
            if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
                ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
            }
        }
    }
}
ibg();

window.addEventListener("load", function () {
    if (document.querySelector('.wrapper')) {
        setTimeout(function () {
            document.querySelector('.wrapper').classList.add('_loaded');
        }, 0);
    }
});

let unlock = true;

//=================
//Menu==========================================================================================
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
    let delay = 500;
    let menuBody = document.querySelector(".menu__body");
    iconMenu.addEventListener("click", function (e) {
        if (unlock) {
            body_lock(delay);
            iconMenu.classList.toggle("_active");
            menuBody.classList.toggle("_active");
        }
    });
};
function menu_close() {
    let iconMenu = document.querySelector(".icon-menu");
    let menuBody = document.querySelector(".menu__body");
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
}
//=================
//BodyLock===============================================================================
function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('_lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}
function body_lock_remove(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("_lock");
        }, delay);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}
function body_lock_add(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        body.classList.add("_lock");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}
//================================================

'use strict';

// Animated Items=========================================================
const animatedItems = document.querySelectorAll('._animated-items');

if (animatedItems.length > 0) {
    window.addEventListener('scroll', animationScroll);
    function animationScroll() {
        for (let index = 0; index < animatedItems.length; index++) {
            const animatedItem = animatedItems[index];
            const animatedItemHeight = animatedItem.offsetHeight;
            const animatedItemOffset = offset(animatedItem).top;
            const animationStart = 4;

            let animationItemPoint = window.innerHeight - animatedItemHeight / animationStart;
            if (animatedItemHeight > window.innerHeight) {
                animationItemPoint = window.innerHeight - window.innerHeight / animationStart;
            }
            if ((pageYOffset > animatedItemOffset - animationItemPoint) && pageYOffset < (animatedItemOffset + animatedItemHeight)) {
                animatedItem.classList.add('_active');
            } else {
                if (!animatedItem.classList.contains('_anim-hide')) {
                    animatedItem.classList.remove('_active');
                }
            }

        }
    }
}

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
//===================================

//  Show more========================================================================================================================================================
const rangeContent = document.querySelector('.range__content');
if (rangeContent) {
    const rangeContentShow = rangeContent.dataset.show;
    const itemsMore = document.querySelector('.range__button');

    let startHeight = 0;
    let allHeight = 0;

    window.addEventListener("resize", function (e) {
        setHeight(true);
    });

    setHeight();

    function getClientWidth() {
        return document.documentElement.clientWidth;
    }
    function setHeight(update = false) {
        const rangeContentItems = document.querySelectorAll('.range__column');
        const windowWidth = getClientWidth();
        if (update) {
            startHeight = 0;
            allHeight = 0;
        }
        rangeContentItems.forEach((item, index) => {
            allHeight += item.offsetHeight;
            if (index < rangeContentShow) {
                startHeight += item.offsetHeight;
            }
        });
        let currentHeight = itemsMore.classList.contains('_active') ? allHeight : startHeight;
        rangeContent.style.height = `${currentHeight}px`;

        if (windowWidth !== getClientWidth() && !update && !isMobile.any()) {
            setHeight(true);
        }
    }
    itemsMore.addEventListener("click", function (e) {
        itemsMore.classList.toggle('_active');

        if (!itemsMore.classList.contains('_active')) {
            rangeContent.style.height = `${startHeight}px`;
        } else {
            rangeContent.style.height = `${allHeight}px`;
            rangeContent.addEventListener("transitionend", setHeight);
        }
        e.preventDefault();
    });
}

// let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
    for (let index = 0; index < forms.length; index++) {
        const el = forms[index];
        el.addEventListener('submit', form_submit);
    }
}
async function form_submit(e) {
    let btn = e.target;
    let form = btn.closest('form');
    let error = form_validate(form);
    if (error == 0) {
        let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const message = form.getAttribute('data-message');
        const ajax = form.getAttribute('data-ajax');
        const test = form.getAttribute('data-test');

        // If test
        if (test) {
            e.preventDefault();
            popup_open(message + '-message');
            form_clean(form);
        }
    } else {
        let form_error = form.querySelectorAll('._error');
        if (form_error && form.classList.contains('_goto-error')) {
            _goto(form_error[0], 1000, 50);
        }
        e.preventDefault();
    }
}
function form_validate(form) {
    let error = 0;
    let form_req = form.querySelectorAll('._req');
    if (form_req.length > 0) {
        for (let index = 0; index < form_req.length; index++) {
            const el = form_req[index];
            if (!_is_hidden(el)) {
                error += form_validate_input(el);
            }
        }
    }
    return error;
}
function form_validate_input(input) {
    let error = 0;
    let input_g_value = input.getAttribute('data-value');

    if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
        if (input.value != input_g_value) {
            let em = input.value.replace(" ", "");
            input.value = em;
        }
        if (email_test(input) || input.value == input_g_value) {
            form_add_error(input);
            error++;
        } else {
            form_remove_error(input);
        }
    } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
        form_add_error(input);
        error++;
    } else {
        if (input.value == '' || input.value == input_g_value) {
            form_add_error(input);
            error++;
        } else {
            form_remove_error(input);
        }
    }
    return error;
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
    if (inputs.length > 0) {
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            const input_g_value = input.getAttribute('data-value');
            input_placeholder_add(input);
            if (input.value != '' && input.value != input_g_value) {
                input_focus_add(input);
            }
            input.addEventListener('focus', function (e) {
                if (input.value == input_g_value) {
                    input_focus_add(input);
                    input.value = '';
                }
                // form_remove_error(input);
            });
            input.addEventListener('blur', function (e) {
                if (input.value == '') {
                    input.value = input_g_value;
                    input_focus_remove(input);
                }
            });
        }
    }
}
function input_placeholder_add(input) {
    const input_g_value = input.getAttribute('data-value');
    if (input.value == '' && input_g_value != '') {
        input.value = input_g_value;
    }
}
function input_focus_add(input) {
    input.classList.add('_focus');
    input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
    input.classList.remove('_focus');
    input.parentElement.classList.remove('_focus');
}

let scr_body = document.querySelector('body');

let scrollDirection = 0;

let currentScroll;

window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
    let src_value = currentScroll = pageYOffset;
    let header = document.querySelector('header.header');
    if (header !== null) {
        if (src_value > 50) {
            header.classList.add('_scroll');
        } else {
            header.classList.remove('_scroll');
        }
    }
    scrollDirection = src_value <= 0 ? 0 : src_value;
}

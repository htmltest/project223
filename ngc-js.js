var ycounter = undefined;
window.onload = function (e) {
    // попытка 1
    var myRegexp = /ym\((.+?), \"init\"/;
    for (var i = 0; i < document.scripts.length; i++) {
        var match = myRegexp.exec(document.scripts[i].text);
        if (match) {
            ycounter = match[1];
            break;
        }
    }
    //console.log("п1. Счетчик - " + ycounter);
    // попытка 2
    setTimeout(function () {
        var myRegexp = /ym\((.+?), \"init\"/;
        for (var i = 0; i < document.scripts.length; i++) {
            var match = myRegexp.exec(document.scripts[i].text);
            if (match) {
                ycounter = match[1];
                break;
            }
        }
        //console.log("п2. Счетчик - " + ycounter);
        scrollreport();
    }, 3000)


}

window.onload = function (e) {

    var ngc_isRobot = false;
    if (!navigator || !navigator.cookieEnabled) {
        ngc_isRobot = true;
        ym(ycounter, 'reachGoal', 'isRobot');
    }
    
}


function debounce(fn, delay) {
    let timer = null;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};

/*
var t = '';
function gText(counterNum) {
    t = (document.all) ? document.selection.createRange().text : document.getSelection();
    if (t.toString().length > 0) {
        var highLightParams = {
            'Выделение текста': {
                'Текст': t.toString(),
            }
        };
        //ym(counterNum, 'reachGoal', 'highLightText', highLightParams) /
    }
}*/

var ngc_copy = 0
document.addEventListener('copy', function (e) {
    const textOnly = document.getSelection().toString();
    //e.preventDefault();
    var copyParams = {
        'Копирование текста': {
            'Текст': textOnly,
        }
    };
    ym(ycounter, 'reachGoal', 'copyText', copyParams)
    //console.log("Скопировано: " + textOnly)
    ngc_copy = ngc_copy + 1
});

document.addEventListener('dblclick', function (e) {
    //gText(counterNum)
    //console.log("двойной клик")
});

document.addEventListener("selectionchange", debounce(function (event) {
    let selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
    //if( selection.length > 0) console.log("Выделено: " + selection)    
}, 1000));


setTimeout(function () {
    if (ngc_notScroled == 1) return
    ym(ycounter, 'reachGoal', '60sec');
}, 60000)


setTimeout(function () {
    if (ngc_notScroled == 1) {
        console.log('Скрола не было , время не считаем.')
        return
    } else {
        console.log('Скрол был , время считаем.')
        ym(ycounter, 'reachGoal', '30sec');
    }

}, 30000)

var scrolled = 0
var ngc_notScroled = 1
var ngc_notTouched = 1
setTimeout(function () {
    //console.log("Высота страницы, px: " + document.documentElement.scrollHeight )
    window.addEventListener('scroll', function () {
        scrollcheck();
        ngc_notScroled = 0;
        ngc_notTouched = 0;
    });
    return
}, 3000)

function scrollcheck() {
    if (scrolled != 0) return
    var docheight = document.documentElement.scrollHeight


    if ((window.pageYOffset + window.innerHeight) > docheight * 0.5) {
        console.log('Скрол 50%')
        //alert('scrol50')
        ym(ycounter, 'reachGoal', 'scrol50');
        if (ycounter != 94571852) ym(94571852, 'reachGoal', 'scrol50');
        if (location.hostname == "tps.ngcm.ru") {
            _tmr.push({
                type: 'reachGoal',
                id: 3331919,
                goal: 'scrol50'
            });
        }
        scrolled = 1

    }
}

//rec638320891
var isOverScroll = function isOverScroll(touchStartY, touchEndY) {

    if ((Math.abs(touchStartY - touchEndY) < 5) &&
        ((window.scrollY = window.innerHeight && touchStartY - touchEndY > 0) ||
            (window.scrollY = 0 && touchStartY - touchEndY < 0))) {
        console.log(touchStartY + ' / ' + touchEndY)
        return false;
    }
    console.log(touchStartY + ' / ' + touchEndY)
    return true;

}




//длина скрола

function scrollDistance(callback, refresh = 66) {

    // Make sure a valid callback was provided
    if (!callback || typeof callback !== 'function') return;

    // Variables
    let isScrolling, start, end, distance;

    // Listen for scroll events
    window.addEventListener('scroll', function (event) {

        // Set starting position
        if (!start) {
            start = window.pageYOffset;
        }

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {

            // Calculate distance
            end = window.pageYOffset;
            distance = end - start;

            // Run the callback
            callback(distance, start, end);

            // Reset calculations
            start = null;
            end = null;
            distance = null;

        }, refresh);

    }, false);

}

var ngc_distance = 0;
var ngc_distance_proc = 0;
scrollDistance(function (distance) {
    //console.log('You travelled ' + parseInt(Math.abs(distance), 10) + 'px ' + (distance < 0 ? 'up' : 'down'));
    ngc_distance = ((ngc_distance + Math.abs(distance)));
    ngc_distance_proc = Math.round(ngc_distance / document.documentElement.scrollHeight * 100)

    //console.log ('Текущий скрол:' + Math.abs(distance) + ' px');  
    //console.log ('Высота страницы:' + document.documentElement.scrollHeight + ' px');    
    console.log('Суммарный скрол:' + ngc_distance_proc + '%');

});

// количество кликов
var ngc_click = 0;
window.addEventListener('click', function () {
    ngc_click = ngc_click + 1;
    //console.log(ngc_click);
});

var ngc_linkClick = 0
window.addEventListener('click', filter, false)

ngc_click_phone = false
ngc_click_email = false
ngc_click_button = false

function filter(e) {
    if (e.target.tagName === 'A') { // провека что кликнули на ссылку
        var link = e.target.href
        console.log('Клик по:' + e.target.href); // получаем URL ссылки
        ngc_linkClick = ngc_linkClick + 1
        if (link.indexOf("tel:") >= 0) {
            ngc_click_phone = true
            //console.log('клик по тел ' + ngc_click_phone)
        }
        if (link.indexOf("@") >= 0) {
            ngc_click_email = true
            //console.log('клик по емейл' + ngc_click_email)

        }
    }
    if (e.target.tagName === 'BUTTON') { // провека что кликнули на кнопку
        //var button = e.target.href
        //console.log('Клик по:' + e.target.type); // получаем URL ссылки
        ngc_click_button = true
    }
}



var ngc_keypressed = 0
document.addEventListener('keydown', function (e) {
    ngc_keypressed = ngc_keypressed + 1
    //console.log('Нажали клавишу');
});

var ngc_active_user = true
setTimeout(function () {

    scrol50 = false
    nonscrol = false

    //console.log('Длина скрола: ' + ngc_distance);
    //console.log('Кликов: ' + ngc_click);
    //console.log('Копирований: ' + ngc_copy);
    //console.log('Кликов по ссылкам: ' + ngc_linkClick);

    if (scrolled > 0) {
        //console.log('Скрол 50% достигнут');
        scrol50 = true
    }
    if (ngc_keypressed > 10) {
        //console.log('Нажатий клавиш: 10+');
    }

    if (ngc_notScroled == 1) {
        //console.log('Страницу не скролили');
        nonscrol = true
    }

    var visitParams = {
        'Активность': {
            'Длина скрола': ngc_distance_proc + '%',
            'Скрол 50%': scrol50,
            'Скрола не было': nonscrol,
            'Кликов': ngc_click,
            'Клик по телефону': ngc_click_phone,
            'Клик по Email': ngc_click_email,
            'Клик по кнопке': ngc_click_button,
            'Кликов по ссылке': ngc_linkClick,
            'Нажатий клавишь': ngc_keypressed,
            'Копирований': ngc_copy,
        }
    };
    ym(ycounter, 'params', visitParams)

    if (scrol50 == true || ngc_copy > 0 || ngc_keypressed > 10 || ngc_click > 10 || ngc_click_email === true || ngc_click_phone === true || ngc_click_button === true) {
        ngc_active_user = true
        ym(ycounter, 'reachGoal', 'active_user');
        if (ycounter == 93384524) {
            _tmr.push({
                type: 'reachGoal',
                id: 3331919,
                value: 500,
                goal: 'active_user'
            });
        }
        // ......
    }

    setTimeout(function () {
        if (ngc_active_user === true) return
        if (scrol50 == true || ngc_copy > 0 || ngc_keypressed > 10 || ngc_click > 10 || ngc_click_email === true || ngc_click_phone === true || ngc_click_button === true) {
            ngc_active_user = true
            ym(ycounter, 'reachGoal', 'active_user');
            if (ycounter == 93384524) {
                _tmr.push({
                    type: 'reachGoal',
                    id: 3331919,
                    value: 500,
                    goal: 'active_user'
                });
            }
            // ......
        }
    }, 60000)


}, 60000)

/*
setTimeout(function () {
    if (ngc_notScroled == 1 || ngc_notTouched == 1) {
        ym(ycounter, 'reachGoal', 'therewasnoscrolling');
        if (ycounter != 94571852) ym(94571852, 'reachGoal', 'therewasnoscrolling');
    }
}, 15000) */

function androidTimout() {
    if (ngc_notScroled == 1 || ngc_notTouched == 1) {
        ym(ycounter, 'reachGoal', 'therewasnoscrolling');
        if (ycounter != 94571852) ym(94571852, 'reachGoal', 'therewasnoscrolling');
    }
}
//window.setTimeout(androidTimout, 15000);





var ngc_scrollreport = 1

function scrollreport() {
    //console.log ('Длина скрола: ' + ngc_distance);
    // your function code here
    if (ngc_scrollreport > 4) return
    param = 'Report' + ngc_scrollreport

    if (ngc_scrollreport == 1) {
        var visitParams = {
            'Длина скрола': {
                1: ngc_distance_proc + '%',
            }
        };
        ym(ycounter, 'params', visitParams)
        //if (ngc_distance == 0) ym(ycounter, 'reachGoal', 'therewasnoscrolling');
    }

    if (ngc_scrollreport == 2) {
        var visitParams = {
            'Длина скрола': {
                2: ngc_distance_proc + '%',
            }
        };
        ym(ycounter, 'params', visitParams)
        if (ngc_distance == 0) ym(ycounter, 'reachGoal', 'therewasnoscrolling');
    }

    if (ngc_scrollreport == 3) {
        var visitParams = {
            'Длина скрола': {
                3: ngc_distance_proc + '%',
            }
        };
        ym(ycounter, 'params', visitParams)
    }

    if (ngc_scrollreport == 4) {
        var visitParams = {
            'Длина скрола': {
                4: ngc_distance_proc + '%',
            }
        };
        ym(ycounter, 'params', visitParams)
    }

    ngc_scrollreport = ngc_scrollreport + 1
    setTimeout(scrollreport, 15000);
}


var isScrolling;
window.addEventListener('touchend', function (event) {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function () {
        //alert( 'Scrolling has stopped.' );
        ngc_notTouched = 0
    }, 100);
}, false);



// Chat GPT
//
// Смотрим был ли скрол или тач на странице.
// ----------------------------------------- 

var ngc_noscroll_no_touch = 0;
var scrolledOrTouched = false;

function handleScroll() {
    scrolledOrTouched = true;
    // Дополнительные действия при скролле
    //console.log("Скрол был");
}

function handleTouch() {
    scrolledOrTouched = true;
    // Дополнительные действия при touch событии
    //console.log("Тач был");
}

function checkScrollAndTouch() {
    if (!scrolledOrTouched) {
        ngc_noscroll_no_touch = 1;
        //console.log("Событий не было");
        ym(ycounter, 'reachGoal', 'therewasnoscrolling2');
    }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("touchstart", handleTouch);

setTimeout(checkScrollAndTouch, 10000);


//
// Отправка Ошибок в Метрику
//
//
// Не более 320 байт после минификации.
window.onerror = function (msg, file, line, col, err) {
    // Отсекаем совсем старые браузеры.
    if (!window.JSON) {
        return;
    }

    var counterId = 95018997, // Ваш номер счётчика Метрики.
        siteInfo = {},
        pointer = siteInfo,
        // Список параметров визитов.
        path = [
            'JS errors', // 1 уровень
            msg, // 2 уровень
            err && err.stack || (file + ':' + line + ':' + col) // 3 уровень
            // Не хватает параметров? Добавьте ещё!
        ];

    // Преобразуем параметры из плоского в древовидный вид для отчёта.
    for (var i = 0; i < path.length - 1; i++) {
        var item = path[i];
        pointer[item] = {};
        pointer = pointer[item];
    }

    pointer[path[i]] = 1;

    new Image().src = 'https://mc.yandex.ru/watch/' + counterId +
        '/?site-info=' + encodeURIComponent(JSON.stringify(siteInfo))
    '&rn=' + Math.random();

    console.log('-- ошибка')
    console.log(siteInfo)
};
//исходные позиции. У нас есть табличка.
//у нас есть десять раундов. В начале каждого раунда устанавливается 10 кеглей
//у вас есть две попытки, чтобы сбить все кегли. Подряд.
// Посчеты:
// Если вы сбили с первого удара все кагли (страйк), то ваш счет будет равен 10 + результат двух ваших следующих бросков
// Если вы выбили 10 кеглей со второй попытки, то счет будет равен 10+ количество сбитых кеглей в одном следующем броске
// 10 раунд
// страйк в 10 раунде, то тебе дается два бонусных броска,
// есть таблица в хтмл, ее нужно заполнить
// есть два источника данных - Аякс и вебсокеты
// два запроса -
//
// 1) первый запрос и получить список дорожек.
// у каждой дорожки свой уникальный id
//2) второй запрос - /laid, в котором мы передаем номер
// дорожки и получаем результаты каждого броска
// задача:
// загружается страница. На странице у таблички дисплей: нон
// вместо этого виден див со словами - выберете дорожку
// выполнить аякс запрос и загрузить в селект - опшионс,
// которые вы получили с аякс запроса
// и кнопочка "показать"
// когда мы нажимаем кнопочку - все скрывается и становится
// видна табличка
// в табличку вы загружаете данные точно также аякс запросом,
// а потом мы прикрутим туда веб-сокет еще
//

window.addEventListener("load", function () {

    var request = new XMLHttpRequest();
    request.open("GET", "http://bowling.smartjs.academy/list");
    request.send();

    request.addEventListener("readystatechange", function (e) {
        if (request.readyState === request.DONE) {
            var list = JSON.parse(request.responseText);
            cb(list);
        }
        ;
    });

    function cb(list) {
        var lanes = document.querySelector('select.lanes');
        for (var i = 0; i < list.length; i++) {
            var option = document.createElement('option');
            var id = list[i];
            option.textContent = id;
            option.value = id;
            lanes.appendChild(option);
        }
    }

    var interval;
    var GLOBAL_INFO = {};
    var trTrows = document.querySelector('.throws');
    var trScore = document.querySelector('.score');

    document.querySelector('button').addEventListener('click', function (e) {

        var lanes = document.querySelector('select.lanes');
        var laneNumber = lanes.options[lanes.options.selectedIndex].value;

        clearInterval(interval);
        interval = setInterval(function () {
            var request2 = new XMLHttpRequest();
            request2.open("GET", "http://bowling.smartjs.academy/lane?num=" + laneNumber);
            request2.send();

            request2.addEventListener('readystatechange', function () {
                if (request2.readyState === request2.DONE) {
                    var throws = JSON.parse(request2.responseText); //ответ с сервера

                    callback2(throws);

                    GLOBAL_INFO.throws = throws;
                    //мне надо сравнить два массива и разницу положить в таблицу, массив который был до и после ответа с сервера
                }
            });
        }, 3000);
    }, false);


    if (GLOBAL_INFO.throws !== undefined) {
        console.log("present" + throws);
        console.log('last ' + GLOBAL_INFO.throws);
        var prevEl = GLOBAL_INFO.throws[GLOBAL_INFO.throws.length - 1];
    }


    function callback2(throws) {
        var allGame = [];
        var round = [];
        throws.forEach(function (item) {
            round.push(item);
            if (item === 10) {
                round.push(item);
                allGame.push(round);
                round = [];
            }
            if (round.length === 2) {
                    allGame.push(round);
                    round = [];
            }
        });

        function render(array) {
            trTrows.innerHTML = '';
            array.forEach(function (item) {
                var td = document.createElement('td');
                if (item[0] === 10) {
                    td.textContent = 'X';
                    var td2 = document.createElement('td');
                    trTrows.appendChild(td);
                    trTrows.appendChild(td2);
                }
                else {
                    //td.textContent = item[0];
                    //if (item[0] + item[1] === 10) {
                    //    td2.textContent = '/';
                    //}
                    //else{
                    //    td2.textContent = item[1];
                    //}
                    item.forEach(function (itemInRound) {
                        var td3 = document.createElement('td');
                        td3.textContent = itemInRound;
                        trTrows.appendChild(td3);
                    }
                }

                /*
                 item.forEach(function (itemInRound) {
                 var td = document.createElement('td');
                 var td2 = document.createElement('td');

                 td.textContent = itemInRound;
                 trTrows.appendChild(td);
                 /!*     if (itemInRound === 10) {
                 td.textContent = 'X';
                 trTrows.appendChild(td);
                 trTrows.appendChild(td2);
                 }
                 else {
                 td.textContent = itemInRound;
                 if (item[0] + item[1] === 10) {
                 td2.textContent = '/';
                 trTrows.appendChild(td2);
                 }
                 trTrows.appendChild(td);
                 }*!/

                 });
                 */

            })
        }

        render(allGame);
        /*
         if (GLOBAL_INFO.firstTrow === undefined) {
         GLOBAL_INFO.firstTrow = throws;
         var firstThrow = GLOBAL_INFO.firstTrow;
         render(firstThrow);
         }

         var prevThrows = GLOBAL_INFO.throws;

         if (typeof prevThrows !== "undefined") {
         var throwsClone = throws.slice(0);
         if (throwsClone.length > prevThrows.length) {
         var lenDiff = throwsClone.length - prevThrows.length;
         var throwsDiff = throwsClone.splice(throwsClone.length - lenDiff, lenDiff);
         }


         if (typeof throwsDiff !== "undefined") {
         render(throwsDiff);
         }
         }*/


        // предварительно мы проверяем, что имеено нам приходит
        //если пришла 10, то мы пишем Х в ячейку
        //если нынешний бросок + последний равен 10, то вместо этого броска мы записываем /
    }


});

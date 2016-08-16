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

                }
            });
        }, 3000);
    }, false);


    /*  if (GLOBAL_INFO.throws !== undefined) {
     console.log("present" + throws);
     console.log('last ' + GLOBAL_INFO.throws);
     var prevEl = GLOBAL_INFO.throws[GLOBAL_INFO.throws.length - 1];
     }*/


    function callback2(throws) {
        var allGame = [[]];
        throws.forEach(function (item, i) {
            allGame[allGame.length-1].push(item);
            if (item === 10 || allGame[allGame.length-1].length === 2) {
                allGame.push([]);
            }
        });

        function render( array) {
            console.log('all', array);
            trTrows.innerHTML = '';
            var score = [];
            var strike = 0;
            var spare = 0;
            array.forEach(function (item) {
                var td = document.createElement('td');
                var td2 = document.createElement('td');
                var tdScore = document.createElement('td');

                if (item[0] === 10) {
                    td.textContent = 'X';
                    if(strike !== 0){
                        strike = strike + 10; //20
                    }
                    strike = 10;
                }
                else {
                    td.textContent = item[0];

                    if (item[0] + item[1] === 10) {
                        td2.textContent = '/';
                        if(spare === 10){
                            spare = spare + item[0];
                            score.push(spare);
                            spare = 0;
                        }
                        spare = 10;
                        if(strike !== 0){
                            strike = strike + spare;
                            score.push(strike);
                            strike = 0;
                        }
                    }
                    else{
                        td2.textContent = item[1];
                        score.push(item[0] + item[1]); //score = [5.2 = 7
                        tdScore.textContent = item[0] + item[1];
                        if(spare !== 0){
                            spare = spare + item[0];
                            score.push(spare);
                            spare = 0;
                        }
                        if(strike !== 0){
                            strike = strike + item[0] + item[1];
                            score.push(strike);
                            strike = 0;
                        }

                    }
                }

                trTrows.appendChild(td);
                trTrows.appendChild(td2);
                /*
                 trScore.appendChild(tdScore);
                 */
            })
        }

        render(allGame);
    }


});
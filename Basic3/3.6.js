//�������� �������. � ��� ���� ��������.
//� ��� ���� ������ �������. � ������ ������� ������ ��������������� 10 ������
//� ��� ���� ��� �������, ����� ����� ��� �����. ������.
// �������:
// ���� �� ����� � ������� ����� ��� ����� (������), �� ��� ���� ����� ����� 10 + ��������� ���� ����� ��������� �������
// ���� �� ������ 10 ������ �� ������ �������, �� ���� ����� ����� 10+ ���������� ������ ������ � ����� ��������� ������
// 10 �����
// ������ � 10 ������, �� ���� ������ ��� �������� ������,
// ���� ������� � ����, �� ����� ���������
// ���� ��� ��������� ������ - ���� � ���������
// ��� ������� -
//
// 1) ������ ������ � �������� ������ �������.
// � ������ ������� ���� ���������� id
//2) ������ ������ - /laid, � ������� �� �������� �����
// ������� � �������� ���������� ������� ������
// ������:
// ����������� ��������. �� �������� � �������� �������: ���
// ������ ����� ����� ��� �� ������� - �������� �������
// ��������� ���� ������ � ��������� � ������ - �������,
// ������� �� �������� � ���� �������
// � �������� "��������"
// ����� �� �������� �������� - ��� ���������� � ����������
// ����� ��������
// � �������� �� ���������� ������ ����� ����� ���� ��������,
// � ����� �� ��������� ���� ���-����� ���
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
                    var throws = JSON.parse(request2.responseText); //����� � �������

                    callback2(throws);

                    GLOBAL_INFO.throws = throws;
                    //��� ���� �������� ��� ������� � ������� �������� � �������, ������ ������� ��� �� � ����� ������ � �������
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


        // �������������� �� ���������, ��� ������ ��� ��������
        //���� ������ 10, �� �� ����� � � ������
        //���� �������� ������ + ��������� ����� 10, �� ������ ����� ������ �� ���������� /
    }


});

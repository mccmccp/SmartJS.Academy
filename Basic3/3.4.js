window.addEventListener('load', function () {
    var container = document.querySelector('#container');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < (~~(Math.random() * 10) + 10); i++){
        var div = document.createElement('div');
        var dx = ~~(Math.random() * 15) + 5;
        var dy = ~~(Math.random() * 15) + 5;
        div.dataset.dx = dx;
        div.dataset.dy = dy;
        div.classList.add('flyer');
        div.style.left = ~~(Math.random() * 1000);
        div.style.top = ~~(Math.random() * 1000);
        div.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        var randomSize = ((Math.random()*51) + 25).toFixed();
        div.style.width = randomSize;
        div.style.height = randomSize;
        var radius = randomSize/2;
        div.dataset.radius = radius;
        div.style.borderRadius = randomSize/2 + 'px';

        fragment.appendChild(div);
    }
    container.appendChild(fragment);

    var flyerArr = Array.from(document.querySelectorAll('.flyer'))

    function fly() {
        for (var j = 0; j < flyerArr.length; j++){
            var flyer = flyerArr[j];
            var dx = flyer.dataset.dx;
            var dy = flyer.dataset.dy;
            flyer.style.left = (parseInt(flyer.style.left, 10) + ~~dx) + 'px';
            flyer.style.top = (parseInt(flyer.style.top, 10) + ~~dy) + 'px';
            var left = flyer.offsetLeft;
            var top = flyer.offsetTop;
            var right = left + flyer.offsetWidth;
            var bottom = top + flyer.offsetHeight;
            if (right > container.offsetWidth) {
                flyer.style.left = (container.offsetWidth - flyer.offsetWidth) + 'px';
                flyer.dataset.dx = -dx;
            }
            if (bottom > container.offsetHeight) {
                flyer.style.top = (container.offsetHeight - flyer.offsetHeight) + 'px';
                flyer.dataset.dy = -dy;
            }
            if (left < 0) {
                flyer.style.left = '0px';
                flyer.dataset.dx = -dx;
            }
            if (top < 0) {
                flyer.style.top = '0px';
                flyer.dataset.dy = -dy;
            }
        }
        shock(flyerArr);
    }
    function shock(arrOfCircles) {
        arrOfCircles.forEach(function (i, indI) {
            arrOfCircles.forEach(function (j, indJ) {
                console.log('n', indI, indJ);
                if(indI < indJ){j
                    var x1 = parseInt(i.style.top) + parseInt(i.dataset.radius);
                    var y1 = parseInt(i.style.left) + parseInt(i.dataset.radius);
                    var x2 = parseInt(j.style.top) + parseInt(j.dataset.radius);
                    var y2 = parseInt(j.style.left) + parseInt(j.dataset.radius);
                    var gipotenuza = parseInt(Math.sqrt(Math.pow((Math.abs(x1 - x2)), 2) + Math.pow((Math.abs(y1 - y2)), 2)));
                    var radiusSum = parseInt(i.dataset.radius) + parseInt(j.dataset.radius);
                    console.log(gipotenuza, radiusSum);
                    if (gipotenuza < radiusSum) {
                        i.dataset.dx = -i.dataset.dx;
                        i.dataset.dy = -i.dataset.dy;
                        j.dataset.dx = -j.dataset.dx;
                        j.dataset.dy = -j.dataset.dy;
                    }
                }

            });
        });
    }
    setInterval(fly, 50);


});
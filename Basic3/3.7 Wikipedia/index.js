document.querySelector('button').addEventListener('click', function () {
    window.answerProcess = function (data){
        var page = data.parse.text['*'];
        var content = document.querySelector('#content');
        content.textContent = page;
    }
    var input = document.querySelector('input');
    var url = 'http://en.wikipedia.org/w/api.php?action=parse&page='+input.value+'&prop=text&section=0&format=json&callback=answerProcess';
    var scr = document.createElement('script');
    scr.src = url;
    document.head.appendChild(scr);
})

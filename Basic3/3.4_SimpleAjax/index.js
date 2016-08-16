window.addEventListener('load', function makeRequest(){
    var start = Date.now();
    var request = new XMLHttpRequest();
    request.open('GET', 'http://jsonplaceholder.typicode.com/users');
    request.send();
    var loadTime = Date.now() - start;
    request.addEventListener('readystatechange', function(e){
        if(request.readyState === request.DONE){
            request = JSON.parse(request.responseText);
            var docFrag = document.createDocumentFragment();
            var div = document.createElement('div');
            div.classList.add('list');
            var ul = document.createElement('ul');
            for (var i = 0; i < request.length; i++){
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = 'mailto:' + request[i].email;
                a.textContent = request[i].name;
                a.title = request[i].username;
                li.appendChild(a);
                ul.appendChild(li);
            }
            div.appendChild(ul);
            var span = document.createElement('span')
            span.classList.add('loadtime')
            span.textContent = loadTime;
            docFrag.appendChild(div);
            docFrag.appendChild(span);
            var button = document.createElement('button');
            button.textContent = 'reload'
            button.classList.add('reload');
            button.addEventListener('click', makeRequest)
            docFrag.appendChild(button);
            document.body.appendChild(docFrag);
        }
    })
})

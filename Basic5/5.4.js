function* getTenPokemonsName() {
    let url = localStorage.getItem('url') || 'http://pokeapi.co/api/v2/pokemon/?limit=10';
    let data = JSON.parse(localStorage.getItem('data')) || [];

    while (url){
        let pokemon = yield fetch(url).then(r => r.json());
        localStorage.setItem('url', pokemon.next);
        url = localStorage.getItem('url');
        /*
         let results = [...pokemon.results];
         */
        localStorage.setItem('data', JSON.stringify(data));
        data = JSON.parse(localStorage.getItem('data')).concat(pokemon.results);
        render(data);
    }

    function render(results){
        let body = document.querySelector('body');
        body.innerHTML = '';
        let ol = document.createElement('ol');

        results.forEach(function (item, i) {
            let li = document.createElement('li');
            let check = document.createElement("input");
            check.setAttribute('type', 'checkbox');
            check.addEventListener('click', (event) => {
                let removed = results.splice(i, 1);
            removed[0].name = removed[0].name + ' *';
            data = removed.concat(data);
        });
        li.textContent = item.name;
        li.appendChild(check);
        ol.appendChild(li);
    });

    body.appendChild(ol);
}
}

co(getTenPokemonsName);


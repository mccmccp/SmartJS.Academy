
var lazyFetch = (function createLazyFetch(url){
    var arr = [];
    return function lazyFetchFn(url){
        let a = arr.find((item) => (item.url === url));
       console.log(a && Date.now() - a.time);
        if(a && (Date.now() - a.time) < 3000){

            return a.resultPromise;
        } else {
            let promise = fetch(url);
            arr.push({
                url: url,
                resultPromise: promise,
                time: Date.now()
            })
            return promise;
        }
    };
})();

//lazyFetch('http://pokeapi.co/api/v2/pokemon/1').then(r => console.log(r));
lazyFetch('http://pokeapi.co/api/v2/pokemon/2').then(r => console.log(r));
setTimeout(function(){
    lazyFetch('http://pokeapi.co/api/v2/pokemon/2').then(r => console.log(r));
}, 2000



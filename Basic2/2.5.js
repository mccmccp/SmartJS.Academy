var graph = [
    {
        from: 1,
        to: 2,
        price: 7
    },
    {
        from: 1,
        to: 3,
        price: 9
    },
    {
        from: 6,
        to: 1,
        price: 14
    },
    {
        from: 2,
        to: 3,
        price: 10
    },
    {
        from: 4,
        to: 2,
        price: 15
    },
    {
        from: 4,
        to: 3,
        price: 11
    },
    {
        from: 5,
        to: 4,
        price: 6
    },
    {
        from: 5,
        to: 6,
        price: 9
    },
    {
        from: 6,
        to: 3,
        price: 2
    }
];

function dejstra(edjes, start, end){
    var prices = {};
    var stack = [start];
    prices[start] = {price:0, path:[]};
    while(stack.length){
        var current = stack.shift();
        for (var i = 0; i < edjes.length; i++){
            if(edjes[i].from === current || edjes[i].to === current){
                var destination;
                if(edjes[i].from === current){
                    destination = edjes[i].to;
                } else {
                    destination = edjes[i].from;
                }
                if(typeof prices[destination] === 'undefined'){
                    prices[destination] = {price: Infinity};
                }
                if(prices[current].price + edjes[i].price < prices[destination].price){
                    prices[destination].price = {prices[current].price + edjes[i].price, path:[].concat(prices[current].path, [current])};
                    if(stack.indexOf(destination) === -1){
                        stack.push(destination);
                    }
                }
            }
        }
    }
    return prices;
}

console.log(dejstra(graph,1,4))
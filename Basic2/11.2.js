var graph = [
    { from: 1, to: 2},
    { from: 3, to: 1},
    { from: 8, to: 1 },
    { from: 2, to: 4 },
    { from: 8, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 4, to: 6 },
    { from: 7, to: 4 },
    { from: 5, to: 6 },
    { from: 5, to: 7 },
];

function check(graph){
    var colors = [1];
    colors[graph[0].from] = 1;
    colors[graph[0].to] = 1;
    function counter (arr){
        var count = 0;
        for (var j = 1; j < colors.length; j++){
            if (colors[j] === 1){
                count++
            }
        }
        return count;
    };
    var counterBefore = counter(graph);
    var counterAfter;
    while(counterBefore !== counterAfter){
        counterBefore = counter(graph);
        for (var i = 1; i < graph.length; i++){
            if(colors[graph[i].from] === 1 && colors[graph[i].to] === 1){
                continue;
            } else if(colors[graph[i].from] === 1){
                colors[graph[i].to] = 1;
            } else if(colors[graph[i].to] === 1){
                colors[graph[i].from] = 1;
            } else {
                colors[graph[i].from] = undefined;
                colors[graph[i].to] = undefined;
            }
        }
        counterAfter = counter(graph);
    }
    if(colors.length-1 === counterAfter){
        return true;
    }
    return false;
};

console.log(check(graph));
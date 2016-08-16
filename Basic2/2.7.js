function floyd(edjes) {
    var arr = [];
    for (var jj = 0; jj < edjes.length; jj++) {
        var item = edjes[jj];
        arr[item.from] = arr[item.from] || [];
        arr[item.to] = arr[item.to] || [];
        arr[item.from][item.to] = item.price; // arr[[_,7], [7,_]]
        arr[item.to][item.from] = item.price;
    }
    var arr2 = [];
    for (var c = 0; c < edjes.length; c++) {
        var item2 = edjes[c];
        arr2[item2.from] = arr2[item2.from] || [];
        arr2[item2.to] = arr2[item2.to] || [];
        arr2[item2.from][item2.to] = item2.to;
        arr2[item2.to][item2.from] = item2.from;
    }

    for (var l = 1; l < arr.length; l++) {
        arr[l] = arr[l] || [];
        arr[l].length = arr.length;
        for (var d = 1; d < arr[l].length; d++) {
            if (typeof arr[l][d] === 'undefined') {
                arr[l][d] = Infinity;
            }
        }
    }

    for (var z = 1; z < arr2.length; z++) {
        arr2[z] = arr2[z] || [];
        arr2[z].length = arr2.length;
        for (var x = 1; x < arr2[z].length; x++) {
            if (typeof arr2[z][x] === 'undefined') {
                arr2[z][x] = 0;
            }
        }
    }
    var next = [[],[],[],[],[],[],[]];
    var flag = true;
    while(flag){
        flag = false;
        for(var i = 1; i < arr.length; i++){
            for(var j = 1; j < arr.length; j++){
                for(var k = 1; k < arr.length; k++){
                    //console.log(arr[1][3], arr[2][1], arr[2][3]);
                    if(arr[i][j] > arr[k][i] + arr[k][j]){
                        arr[i][j] = arr[k][i] + arr[k][j];

                            next[i][j] = next[i][j].push(k);


                        flag = true;
                    }
                }
            }
        }
    }
    console.log(next);

    function getShortestPath(i, j){
        if (arr[i][j] === Infinity){
            console.log('no way');
        }
        var c = i;
        while (c !== j){
            console.log(c);
            c = next[c][j];
            console.log(j);
        }
    };


    var str = "";
    for (var i = 1; i < arr.length; i++) {
        for (var j = 1; j < arr[i].length; j++) {
            str += arr[i][j] === Infinity ? '_' : arr[i][j];
            str += ' ';
        }
        str += '\n'
    }
    var str2 = "";
    for (var i = 1; i < arr2.length; i++) {
        for (var j = 1; j < arr2[i].length; j++) {
            str2 += arr2[i][j] === 0 ? 0 : arr2[i][j];
            str2 += ' ';
        }
        str2 += '\n'
    }


   // console.log(str)
}

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
        price: 8
    },
    {
        from: 6,
        to: 3,
        price: 2
    }
];
floyd(graph)

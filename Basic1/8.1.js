function permutations(n) {
    var arr = [];
    for (var k = 1; k <= n; k++){
        arr.push(k);
    }
    function generatePermutations(list){
        if(list.length === 1) {
            return [list];
        }
        var results = [];
        for (var i = 0; i < list.length; i++) {
            var newList =[].concat(list);
            newList.splice(i, 1);
            var smallerResults = generatePermutations(newList);
            for(var j=0; j< smallerResults.length; j++) {
                results.push([list[i]].concat(smallerResults[j]));
            }
        }
        return results;
    }
    return generatePermutations(arr);
};

console.log(permutations(3));
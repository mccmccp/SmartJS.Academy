function binSearch(arr, value) {
    var result;
    var halfArr = Math.round((arr.length - 1) / 2)
    if (arr[halfArr] === value) {
        return halfArr;
    }
    else if (value > arr[halfArr]) {
        var newArr = [];
        for (var i = halfArr + 1; i < arr.length; i++) {
            newArr.push(arr[i]);
        }
        result = binSearch(newArr, value) + (halfArr + 1);
        if (result === -1) {
            return -1;
        }
        return result;
    }
    else if (value < arr[halfArr]) {
        var newArr = [];
        for (var i = 0; i < halfArr; i++) {
            newArr.push(arr[i]);
        }
        result = binSearch(newArr, value);
        return result
    }
    else {
        return -1;
    }
};



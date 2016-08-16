function f(str){
    str = str.toLowerCase();
    str = str.replace(/[ /.,!?;:()]*/g, '');
    var obj = {};
    for (var i = 0; i < str.length; i++) {
        if (obj[str[i]]){
            obj[str[i]] += 1;
        }
        else {
            obj[str[i]] = 1;
        }
    }
    function compare(a, b) {
        if (obj[b] > obj[a]) return 1;
        if (obj[b] < obj[a]) return -1;
    }
    var sortObjArr = Object.keys(obj).sort(compare);
    var result = 0;
    for (var i = 0; i < sortObjArr.length; i++){
        obj[sortObjArr[i]] *= (26-i);
        result += obj[sortObjArr[i]]
    }
    return result;
};
function search (needle, haystack){
    var stack = [haystack];
    var currentObj;
    while (stack.length){
        currentObj = stack.shift();
        for (var key in currentObj){
            if (needle === currentObj[key]){
                return true;
            }
            if(typeof currentObj[key] === 'object'){
                stack.push(currentObj[key]);
            }
        }
    }
    return false;
};
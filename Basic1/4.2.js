/**
 * Created by Ko$ on 11.11.2015.
 */
function search(needle, haystack){
    var result;
    if(typeof haystack ==='object'&& haystack !== null){
        if (Array.isArray(haystack) === true){
            for (var i = 0; i < haystack.length; i++){
                var way = '['+i+']';
                result = search(needle,haystack[i])
                if (result !== false){
                    way = way + result;
                    return way;
                }
            }
            return result;
        }
        else {
            for(var key in haystack){
                var way = '.'+key;
                result = search(needle,haystack[key]);
                if (result !== false){
                    way = way + result;
                    return way;
                }
            }
            return result;
        }
    }
    else {
        if(needle !== haystack){
            return false;
        }
        else {
            return "";
        }
    }
};
var x = {a:1,b:[4,{h:5}],c:3,h:7};
console.log(search(5, x))
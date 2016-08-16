/**
 * Created by Ko$ on 19.10.2015.
 */
function search (needle, haystack){
    for (var key in haystack){
        var valueOfKey = haystack[key];
        if (Array.isArray(valueOfKey) === true){
            for (var i = 0; i < valueOfKey.length; i++){
                if (needle === valueOfKey[i]){
                    return true;
                }
            }
            if(search (needle, valueOfKey)){
                return true;
            }
        }
        else if (typeof (haystack[key]) === "object"){
            if (search (needle, valueOfKey)){
                return true;
            }
        }
        else if(needle === haystack[key]){
            console.log("true");
            return true;
        }
    }
    return false;
};
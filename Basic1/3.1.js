function equal (obj1, obj2){
    var result;
    if(typeof obj1==='object'&& typeof obj2==='object' && obj1!==null){
        if (Array.isArray(obj1) && Array.isArray(obj2)){
            if (obj1.length === obj2.length){
                for (var i = 0; i < obj1.length; i++){
                    result = equal(obj1[i],obj2[i])
                    if (result === false){
                        return result;
                    }
                }
            } else {
                return false;
            }
        }
        else {
            if(Object.keys(obj1).length === Object.keys(obj2).length && !Array.isArray(obj2)){
                for(var key in obj1){
                    result = equal(obj1[key],obj2[key])
                    if (result === false){
                        return result;
                    }
                }
            } else{
                return false;
            }
        }
    }
    else {
        return obj1 === obj2;
    }
    return result;
};
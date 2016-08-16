
function clone (obj){
    if (Array.isArray(obj) === true){
        var copy = [];
        for (var i = 0; i < obj.length; i++){
            copy[i] = clone(obj[i]);
        }
    }
    else if(typeof obj==='object'&&obj!==null){
        var copy = {};
        for(var key in obj){
            copy[key] = clone(obj[key]);
        }
    }
    else{
        return obj;
    }
    return copy;
};
var a = {a: 8,b: [1, {a: 'a'}]};
var b = clone(a);
console.log(b);
b.b[1].a = 'aaaaaa';
console.log(a);
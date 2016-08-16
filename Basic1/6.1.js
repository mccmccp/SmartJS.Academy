function myBind(fn, newThis){
    var copyArg = [].slice.call(arguments);
    return function(){
        var bindArg = copyArg.concat().splice(2);
        var funcArg = [].slice.call(arguments);
        var allArg = bindArg.concat(funcArg);
        return fn.apply(newThis, allArg);
    };
};

function f(p1, p2, n1){
    console.log(p1+p2-n1);
};

var g2 = myBind(f, null, 1, 2, 5);
g2(3);
var g = f.bind(null,1,2);
g(3);

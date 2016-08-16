var R = {
    _:'котик',
    bind: function(fn, newThis){
        var copyArg = [].slice.call(arguments);
        return function(){
            var bindArg = copyArg.concat().splice(2);
            var funcArg = [].slice.call(arguments);
            bindArg.forEach(function(item, i) {
                if (item === 'котик'){
                    bindArg.splice(i,1,funcArg[0]);
                    funcArg.splice(0, 1);
                }
            });
            var allArg = bindArg.concat(funcArg);
            return fn.apply(newThis, allArg);
        }
    }

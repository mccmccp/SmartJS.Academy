function mybind(f, t){
    return function(){
        f.apply(t, arguments);
    }
}

function calc (n1, op, n2, n3){
    if(op !== '+' || op !== '-' || op !== '*' || op !== '/'){
        var result;
        switch(op) {
            case '+': result = n1 + n2;
                break;
            case '-': result = n1 - n2;
                break;
            case '/': result = n1 / n2;
                break;
            case '*': result = n1 * n2;
                break;
        }
        if (Math.abs(result - n3) < Number.EPSILON){
            return true;
        }
    }
    return false;
};
console.log(calc(0.1, '+', 0.2, 0.3));
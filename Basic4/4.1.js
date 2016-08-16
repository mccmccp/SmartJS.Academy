function Complex (a, b){
    this.a = a;
    this.b = b
}

Complex.prototype.add = function(num){
    if (typeof num === 'number'){
        return new Complex(this.a+num, this.b)
    }
    if (num instanceof Complex){
        return new Complex(this.a+num.a, this.b+num.b)
    }
    return false;
}

Complex.prototype.sub = function(num){
    if (typeof num === 'number'){
        return new Complex(this.a-num, this.b)
    }
    if (num instanceof Complex){
        return new Complex(this.a-num.a, this.b-num.b)
    }
    return false;
}

Complex.prototype.mul = function(num){
    if (typeof num === 'number'){
        return new Complex(this.a * num, this.b);
    }
    if (num instanceof Complex){
        return new Complex(this.a * num.a - this.b * num.b, this.a * num.b + this.b * num.a)
    }
    return false;
}

Complex.prototype.div = function(num){
    if (typeof num === 'number'){
        return new Complex(this.a / num, this.b);
    }
    if (num instanceof Complex){
        return new Complex(this.a * num.a + this.b * num.b, (this.b * num.a - this.a * num.b)/(num.a * num.a + num.b * num.b))
    }
    return false;
}

Complex.prototype.equ = function(num){
    if (typeof num === 'number'){
        if (this.a === num && this.b === 0){
            return true;
        } else {
            return false;
        }
    }
    if (num instanceof Complex){
        if (this.a === num.a && this.b === num.b){
            return true;
        } else {
            return false;
        }
    }
    return false;
}

Complex.prototype.conj = function(){
    return new Complex(this.a, -this.b);
}

var  x = new Complex(2, 2);
var  y = new Complex(10, 8);

console.log(y.conj())
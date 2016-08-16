function rpn (arr){
    var stack = [];
    for(var i = 0; i < arr.length; i++){
        if(typeof arr[i] === 'number'){
            stack.push(arr[i]);
        } else {
            var result;
            var n1 = stack.pop();
            var n2 = stack.pop();
          	if (typeof n1 && typeof n2 !== 'number'){
            	return false;
            }
            switch(arr[i]) {
                case '+': result = n1 + n2;
                    break;
                case '-': result = n1 - n2;
                    break;
                case '/': result = n1 / n2;
                    break;
                case '*': result = n1 * n2;
                    break;
            }
            stack.push(result);
        }
    }
  	if (stack.length !== 1){
    	return false;
    }
    return stack.pop();
}
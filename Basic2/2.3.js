function convert (str){
    var arr = [];
  	var x = '';
  	for (var k = 0; k <= str.length; k++){
      	if (str[k] === undefined){
          arr.push(x);
        }
      	if (str[k] === ')'){
          arr.push(x);
          x = '';
        }
      	if (str[k] !== ' '){
          	x += str[k];
        }
    	if (str[k] === ' ' || str[k] === '('){
        	arr.push(x);
          	x = '';
        }
    }
  	console.log(arr);
    var priority = {
        '+' : '2',
        '-' : '2',
        '*' : '3',
        '/' : '3',
        '(' : '1',
        ')' : '1'
    }
    var stack = [];
    var stackSymbol = [];
    for(var i = 0; i < arr.length; i++){
        if(!isNaN(+arr[i])){
            stack.push(arr[i]);
        } else {
            if(arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/'){
                if(stackSymbol.length !== 0){
                    for(var j = stackSymbol.length-1; j >= 0; j--){
                        if(priority[arr[i]] <= priority[stackSymbol[j]]){
                            stack.push(stackSymbol[j]);
                            stackSymbol.pop();
                            stackSymbol.push(arr[i])
                            break;
                        } else {
                            stackSymbol.push(arr[i]);
                            break;
                        }
                    }
                } else {
                    stackSymbol.push(arr[i])
                }
            } else if(arr[i] === '('){
                stackSymbol.push(arr[i]);
            } else if(arr[i] === ')'){
                for(var jj = stackSymbol.length-1; jj => 0; jj--){
                    if(stackSymbol[jj] === '('){
                        stackSymbol.pop();
                        break;
                    } else{
                        var n = stackSymbol.pop();
                        stack.push(n);
                    }
                }
            }
        }
    }
    while(stackSymbol.length){
        var n2 = stackSymbol.pop();
        stack.push(n2);
    }

    return stack;
}
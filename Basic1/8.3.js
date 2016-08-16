/**
 * Created by Ko$ on 18.11.2015.
 */
function nextPermutation(str){
    var string = str.split('');
    var startPosition = string.length - 2;
    var stringRightPart = [string[string.length - 1]];
    while (startPosition >= 0 && string[startPosition] > str[startPosition + 1]){
        stringRightPart.push(string[startPosition]);
        startPosition --;
    }
    if(startPosition === -1){
        return false;
    }
    stringRightPart.sort();
    var changeNumber;

    for (var i = 0; i < stringRightPart.length; i++){
        if (stringRightPart[i] > string[startPosition]){
            changeNumber = stringRightPart[i];
            break;
        }
    };
    stringRightPart[i] = string[startPosition];
    string[startPosition] = changeNumber;
    stringRightPart.sort();
    return string.slice(0, startPosition + 1).concat(stringRightPart).join('');
};
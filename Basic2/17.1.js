var red = 'red';
var black = 'black';
function create(value) {
    return {value: value, color: red, left: null, right: null}
};

function add(tree, value) {
    if(value < tree.value){
        if(tree.left === null){
            tree.left = {value: value, left: null, right: null};
        }else{
            add(tree.left, value);
        }
    }else{
        if(tree.right === null){
            tree.right = {value: value, left: null, right: null};
        }else{
            add(tree.right, value);
        }
    }
};

var t  = create(2);
add(t, 4);
console.log(t);
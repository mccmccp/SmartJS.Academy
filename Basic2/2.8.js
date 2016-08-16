function create(value) {
    return {value: value, left: null, right: null}
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
function search(tree, value) {
    if (tree.value === value){
        return tree;
    } else if(value < tree.value){
        if(tree.left === null){
            return false
        } else {
            return search(tree.left, value)
        }
    } else if(value > tree.value){
        if(tree.right === null){
            return false;
        } else {
            return search(tree.right, value)
        }
    }
};
function print(tree){
    var arr = [];
    if(tree.left !== null){
        var resultLeft = print(tree.left);
        arr = resultLeft;
    }
    if(tree.right !== null){
        var resultRight = print(tree.right);
        arr = arr.concat(tree.value, resultRight);
    }
    if(tree.left !== null && tree.right === null){
        arr = arr.concat(tree.value);
    }
    if(tree.left === null && tree.right === null){
        arr.push(tree.value);

    }
    return arr;
};


function remove(tree, value) {
    function minimum(tree, value){
        var min;
        if(tree.left === null){
            min = tree.value ;
            tree.value = value;
            return min;
        }
        return minimum(tree.left, value)
    };
    function maximum(tree, value){
        var max;
        if(tree.right === null){
            max = tree.value;
            tree.value = value;
            return max;
        }
        return maximum(tree.right, value)
    };
    if (tree.left !== null && tree.left.value === value){
        if(tree.left.left === null && tree.left.right === null){
            tree.left = null;
        } else if(tree.left.left !== null){
            tree.left.value = maximum(tree.left.left, value);
            remove(tree, value);
        } else if(tree.left.right !== null){
            tree.left.value = minimum(tree.left.right, value);
            remove(tree, value);
        }
    } else if (tree.right !== null && tree.right.value === value){
        if(tree.right.left === null && tree.right.right === null){
            tree.right = null;
        } else if(tree.right.left !== null){
            tree.right.value = maximum(tree.right.left, value);
            remove(tree, value);
        } else if(tree.right.right !== null){
            tree.right.value = minimum(tree.right.right, value);
            remove(tree, value);
        }
    } else {
        if (tree.left !== null && value < tree.value){
            remove(tree.left, value);
        } else {
            remove(tree.right, value);
        }
    }
};
var t  = create(8);
add(t, 10);
add(t, 3);
add(t, 1);
add(t, 6);
add(t, 14);
add(t, 13);
remove(t, 3);
console.log(t);
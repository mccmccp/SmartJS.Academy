function getBlackHeight(tree){
    if (!tree){
        return 0;
    }
    var leftHeight = getBlackHeight(tree.left);
    var rightHeight = getBlackHeight(tree.right);
    if(tree.color === 'black'){
        return leftHeight + 1;
    }
    return leftHeight;
}

function checkTree(tree){
    if(tree.color === 'red' && tree.left.color === 'black' && tree.right.color === 'black'){

    }
    if(tree.left.value < tree.value && tree.right.value > tree.value){

    }

    return;
}
//Здесь будет код вращения
function getBlackHeight(tree){
    if (!tree){
        return 0;
    }
    var leftHeight = getBlackHeight(tree.left);
    var rightHeight = getBlackHeight(tree.right);
    if(leftHeight !== rightHeight || leftHeight === -1){
        return -1;
    }
    if(tree.color === 'black'){
        return leftHeight + 1;
    }
    return leftHeight;
}
function checkTree (tree) {
    if (!tree) {
        return true;
    }
    if (tree.color === 'red' && (tree.left && tree.left.color !== 'black' || tree.right && tree.right.color !== 'black')) {
        return false;
    }
    if (tree.left && tree.left.value > tree.value || tree.right && tree.right.value < tree.value) {
        return false;
    }
    if (getBlackHeight(tree) === -1) {
        return false;
    }
    //var result = true;
    //if (tree.left) {
    //    result = checkTree(tree.left);
    //}
    //if (tree.right) {
    //    result = checkTree(tree.right);
    //}
    return checkTree(tree.left) && checkTree(tree.right);
}

function singleRotate(node, direction){
    var temp = {value: node.value, color: node.color, left: node.left, right: node.right};
    var otherDirection = (direction === 'left')?'right':'left';
    node.value = temp[otherDirection].value;
    node.color = temp[otherDirection].color;
    node[otherDirection] = temp[otherDirection][otherDirection];
    node[direction] = temp;
    node[direction][otherDirection] = temp[otherDirection][direction];
}

//function singleRotate (tree, direction) {
//    /*  debugger;*/
//    var temp = {value: tree.value, color: tree.color, left: tree.left, right: tree.right};
//    var otherDirection = direction === 'left' ? 'right' : 'left';
//
//    var newRoot = tree[otherDirection];
//    tree.value = newRoot.value;
//    tree.color = newRoot.color;
//    tree.left = newRoot.left;
//    tree.right = newRoot.right;
//    temp[otherDirection] = tree[direction];
//    tree[direction] = temp;
//}

function doubleRotate(node, direction){
    var otherDirection = (direction === 'left')?'right':'left';
    singleRotate(node[otherDirection], otherDirection);
    singleRotate(node, direction);
}

function addNode(tree, node){
    if(node.value < tree.value){
        if(tree.left === undefined){
            tree.left = node;
        }else{
            addNode(tree.left, node);
        }
        tree.left.parent = tree;
    }else{
        if(tree.right === undefined){
            tree.right = node;
        }else{
            addNode(tree.right, node);
        }
        tree.right.parent = tree;
    }

    if (checkTree(tree) === false){
        if (node.parent.parent.left === node.parent && node.parent.left === node){
            if (node.parent.color === 'red' && node.parent.parent.right.color === 'red'){
                node.parent.color = 'black';
                node.parent.parent.right.color = 'black';
                node.parent.parent.color = 'red';
            } else {
                singleRotate(node.parent, 'right');
            }
        }
        //    if (node.parent.color === 'red' && node.parent.parent.left === 'red'){
        //        node.parent.color = 'black';
        //        node.parent.color = 'black';
        //    }
        //    if (node.parent.color === 'red' && node.parent.parent.left === 'black'){
        //        singleRotate(tree, 'left');
        //    }
        //    if (!node.parent){
        //        tree.color = 'black';
        //    }
    }
}
renderTree(document.querySelector('#tree1'), tree);


addNode(treeMy, {value: 1, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 2, color: 'red', left: undefined, right: undefined});
renderTree(document.querySelector('#tree2'), treeMy);



/**
 * Created by Ko$ on 25.02.2016.
 */




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
    return checkTree(tree.left) && checkTree(tree.right);
}

function addParents(tree) {
    if (tree.left) {
        tree.left.parent = tree;
        addParents(tree.left);
    }
    if (tree.right) {
        tree.right.parent = tree;
        addParents(tree.right);
    }
}

function singleRotate(node, direction){
    var temp = {value: node.value, color: node.color, left: node.left, right: node.right, parent: node.parent};
    var otherDirection = (direction === 'left')?'right':'left';
    node.value = temp[otherDirection].value;
    node.color = temp[otherDirection].color;
    node[otherDirection] = temp[otherDirection][otherDirection];
    node[direction] = temp;
    node[direction][otherDirection] = temp[otherDirection][direction];
    node[direction].color = 'red';
    node.color = 'black';
}

function doubleRotate(node, direction){
    var otherDirection = (direction === 'left')?'right':'left';
    singleRotate(node[otherDirection], otherDirection);
    singleRotate(node, direction);
}

function addNumber (tree, node) {
    if (node.value < tree.value) {
        if (tree.left === undefined) {
            tree.left = node;
        } else {
            addNumber(tree.left, node);
        }
        tree.left.parent = tree;
    } else {
        if (tree.right === undefined) {
            tree.right = node;
        } else {
            addNumber(tree.right, node);
        }
        tree.right.parent = tree;
    }
}

function makeWrightTree (tree, node) {
    if (node.parent.parent) {
        if (node.parent.parent.left === node.parent && node.parent.left === node) {
            if (node.parent.parent.right !== undefined && node.parent.color === 'red' && node.parent.parent.right.color === 'red') {
                node.parent.color = 'black';
                node.parent.parent.right.color = 'black';
                node.parent.parent.color = 'red';
            } else {
                singleRotate(node.parent.parent, 'right');
            }
        }
        if (node.parent.parent.left === node.parent && node.parent.right === node) {
            if (node.parent.parent.right !== undefined && node.parent.color === 'red' && node.parent.parent.right.color === 'red') {
                node.parent.color = 'black';
                node.parent.parent.right.color = 'black';
                node.parent.parent.color = 'red';
            } else {
                doubleRotate(node.parent.parent, 'right');
            }
        }
        if (node.parent.parent.right === node.parent && node.parent.right === node) {

            if (node.parent.parent.left !== undefined && node.parent.color === 'red' && node.parent.parent.left.color === 'red') {
                node.parent.color = 'black';
                node.parent.parent.left.color = 'black';
                node.parent.parent.color = 'red';
            } else {
                singleRotate(node.parent.parent, 'left');
            }
        }
        if (node.parent.parent.right === node.parent && node.parent.left === node) {
            if (node.parent.parent.left !== undefined && node.parent.color === 'red' && node.parent.parent.left.color === 'red') {
                node.parent.color = 'black';
                node.parent.parent.left.color = 'black';
                node.parent.parent.color = 'red';
            } else {
                doubleRotate(node.parent.parent, 'left');
            }
        }
    }
}

function addNode(tree, node){
    addParents(tree);
    addNumber (tree, node);
    while (checkTree(tree) === false){
        makeWrightTree (tree, node);
        node = node.parent.parent;
    }
    tree.color = 'black';
}
renderTree(document.querySelector('#tree1'), treeMy);
addNode(treeMy, {value: 5, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 6, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 7, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 8, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 9, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 10, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 11, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 12, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 13, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 14, color: 'red', left: undefined, right: undefined});
addNode(treeMy, {value: 15, color: 'red', left: undefined, right: undefined});
renderTree(document.querySelector('#tree2'), treeMy);




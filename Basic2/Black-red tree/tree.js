(function () {
  function getTreeHeight(tree) {
    if (!tree) { return 0; }
    return 1 + Math.max(getTreeHeight(tree.left), getTreeHeight(tree.right));
  }

  function generateLevelArray(tree) {
    var currentQueue = [tree];
    var newQueue;
    var height = getTreeHeight(tree);
    var result = [];

    for (var i = 0; i < height; i++) {
      var line = [];
      newQueue = [];
      currentQueue.forEach(function (item) {
        line.push(item);
        if (item) {
          newQueue.push(item.left);
          newQueue.push(item.right);
        } else {
          newQueue.push(undefined);
          newQueue.push(undefined);
        }
      });
      currentQueue = newQueue;
      result.push(line);
    }
    return result;
  }

  function renderTree(target, tree) {
    var levels = generateLevelArray(tree);
    var currentColSpan = Math.pow(2, levels.length - 1);

    target.innerHTML = '';
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    levels.forEach(function (level) {
      var row = document.createElement('tr');
      level.forEach(function (record) {
        var td = document.createElement('td');
        td.colSpan = currentColSpan;
        var span = document.createElement('span');
        if (record) {
          span.innerText = record.value;
          td.className = record.color;
          td.appendChild(span);
        }
        row.appendChild(td);
      });
      tbody.appendChild(row);
      currentColSpan /= 2;
    });

    target.appendChild(table);
  }

  function renderComparedTrees(target, tree1, tree2) {
    var currentTree = tree1;
    setInterval(function () {
      renderTree(target, currentTree);
      currentTree = currentTree === tree1 ? tree2 : tree1;
    }, 500)
  };

  window.renderComparedTrees = renderComparedTrees;
  window.renderTree = renderTree;
})();

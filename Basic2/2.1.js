var  List  = {
    create: function () {
        return {value : 'head', next : null}
    },
    add: function (list, number) {
        if (list.next === null) {
            list.next = {value : number, next : null};
        } else  {
            List.add(list.next, number);
        }
    },
    get: function (list, index) {
        if (index === 0) {
            return list;
        } else if (list === null){
            return false;
        }else  {
            return List.get(list.next, index--);
        }
    },
    remove: function (list, index) {
        if (index === 0) {
            list.next = list.next.next;
        } else  {
            List.remove(list.next, index--);
        }
    },
    search: function(list, v){
        if (list.value === v){
            return list;
        } else if(list.next === null){
            return null;
        } else {
            return List.search(list.next, v);
        }
    },
    isEmpty: function(list){
        if (list.next !== null) {
            return false;
        } else  {
            return true;
        }
    },
    toArray: function(list){
        var arr = []
        if(list.next === null){
            return list.value;
        } else if (list.value === 'head'){
            var result = List.toArray(list.next);
            var arr = arr.concat(result);
        } else {
            arr.push(list.value);
            var result = List.toArray(list.next);
            var arr = arr.concat(result);
        }
        return arr;
    },
    insertAt: function (list, v, index) {
        if (index === 0) {
            list.next.value = v;
        } else  {
            List.insertAt(list.next, v, index-1);
        }
    },
    size: function(list){
        var count;
        if(list.next === null){
            return count = 0;
        } else {
            var result = List.size(list.next)+1;
            return result;
        }
    }
};
var a = List.create();
List.add(a, 3);
List.add(a, 4);
List.add(a, 1);
List.add(a, 5);
console.log(a);
List.remove(a, 2)
console.log(a);

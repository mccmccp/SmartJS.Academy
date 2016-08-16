const todos = {
    1: {done: false, text: 'Решить все задания 4 модуля'},
    2: {done: false, text: 'Заплатить за 5 модуль'},
    3: {done: false, text: 'Победить лень'},
    4: {done: false, text: 'Захватить мир'}
};

class TodoList {
    constructor(data) {
        this.todos = data.todos;
        this.node = data.node;
        this.onTodoStateChanged = data.onTodoStateChanged;
        this.onTodoRemoved = data.onTodoRemoved;
        this.onTodoAdd = data.onTodoAdd;
    }

    get todos() {
        return this._todos;
    }

    set todos(value) {
        this._todos = value;
        setTimeout(() => this.render());
    }


    render() {
        if (!this.node) {
            return;
        }
        this.node.innerHTML = '';
        const ul = document.createElement('ul');
        for (const i in this.todos) {
            const li = document.createElement('li');
            li.textContent = this.todos[i].text;
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.checked = this.todos[i].done;
            checkbox.addEventListener('change', ()=> {
                this.onTodoStateChanged(i);
            })
            const x = document.createElement('span');
            x.textContent = 'x';
            x.addEventListener('click', ()=> {
                this.onTodoRemoved(i);
            })

            li.appendChild(checkbox);
            li.appendChild(x);

            ul.appendChild(li);
        }
        const field = document.createElement('input');
        field.addEventListener('keypress', (event)=> {
            if (event.keyCode === 13) {
                this.onTodoAdd(event.target.value);
            }

        })
        this.node.appendChild(field);
        this.node.appendChild(ul);
    }
}
;

const todoList = new TodoList({
    todos,
    node: document.querySelector('todos'),
    onTodoStateChanged: function (id) {
        this.todos = {
            ...this.todos,
            [id]: {...this.todos[id], done: !this.todos[id].done}
        };
    },
    onTodoRemoved: function (id) {
        const newTodos = {...this.todos};
        delete newTodos[id];
        this.todos = newTodos;
    },
    onTodoAdd: function (text) {
        this.todos = {
            ...this.todos,
            [Math.random().toString(16).substr(2)]: {done: false, text}
        };
    }
});
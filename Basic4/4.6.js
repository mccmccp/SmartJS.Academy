class Circle {
    static getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    constructor(x, y, myField, hex = Circle.getRandomColor()) {
        this.x = x;
        this.y = y;
        this.myField = myField;
        this.color = hex;
        this.node = document.createElement('div');
        this.node.style.borderRadius = '50%';
        this.node.style.background = this.color;
        this.node.style.position = 'absolute';
        this.node.style.boxSizing = 'border-box';
        this.node.style.height = 100 + 'px';
        this.node.style.width = 100 + 'px';
        this.node.classList.add('circle');
        this.drag(this.node);
    }

    drag(element) {
            var movingElement;
            element.addEventListener('mousedown', (event) => {
                movingElement = element;
                movingElement.dataset.x = event.x;
                movingElement.dataset.y = event.y;

            });
            document.addEventListener('mousemove', (event) => {
                if (movingElement) {
                    var deltaX = event.x - movingElement.dataset.x;
                    var deltaY = event.y - movingElement.dataset.y;
                    this.x = movingElement.offsetLeft + deltaX;
                    this.y = movingElement.offsetTop + deltaY;
                    this.myField.update();
                    movingElement.dataset.x = event.x;
                    movingElement.dataset.y = event.y;
                }
            });
            document.addEventListener('mouseup', (event) => {
                if (movingElement) {
                    delete movingElement.dataset.x;
                    delete movingElement.dataset.y;
                    movingElement = null;
                }
            })
        }

    get x() {
        return this._x;
    }

;

    set x(value) {
        this._x = value;
        setTimeout(() =>
            this.render(),
            0);
    }

;

    get y() {
        return this._y;
    }

;

    set y(value) {
        this._y = value;
        setTimeout(() => this.render(), 0);
    }

;

    render() {
        if(this.node.style.left && this.node.style.top){
            this.node.style.left = this.x + 'px';
            this.node.style.top = this.y + 'px';
        } else {
            this.node.style.left = this.x + '%';
            this.node.style.top = this.y + '%';
        }
    }

};



class Field {

    constructor(node) {
        this.node = node;
        this.node.style.height = 100 + '%';
        this.node.style.width = 100 + '%';
        this.circles = [];
        for (let i = 0; i <= 10; i++) {
            let x = ~~(Math.random() * 1000);
            let y = ~~(Math.random() * 500);
            this.addCircle(x, y);
        }
        console.log(this.node);
        this.node.addEventListener('dblclick', (event) => {
            if(event.target.classList.value === 'circle'){
                this.removeCircle(event.target);
            } else {
                this.addCircle(event.x, event.y);
            }

        });


    }

    registerCircle(circle) {
        this.circles = [...this.circles, circle];
    }

    intersects(x, y) {
        for (let i = 0; i<this.circles.length; i++) {
            var x1 = this.circles[i].x + 50;
            var y1 = this.circles[i].y + 50;
            var x2 = x + 50;
            var y2 = y + 50;
            let dist = parseInt(Math.sqrt(Math.pow((Math.abs(x1 - x2)), 2) + Math.pow((Math.abs(y1 - y2)), 2)));
            if (dist < 100) {
                return true;
            }
        }
        return false;
    }

    addCircle(x, y, color) {

        if (this.intersects(x, y) === true) {
            let xNew = ~~(Math.random() * 1000);
            let yNew = ~~(Math.random() * 500);
            this.addCircle(xNew, yNew);
        } else {
            const c = new Circle(x, y, this, color);
            this.registerCircle(c)
        }
    }

    set circles(value) {
        this._circles = value;

       setTimeout(() => {
            this.render();
        }, 0);
    }


    get circles() {
        return this._circles;
    }

    render() {
        // var circlesArr = this.circles.map((item) => {
        //     return item.node;
        // });
        let children = this.node.querySelectorAll('div');
        children = Array.from(children);
        if(this.circles.length > children.length){
            this.circles.forEach(circle => {
                if(!children.find(child => child === circle.node)){
                    this.node.appendChild(circle.node);
                }
            });
        } else if(this.circles.length < children.length){
            children.forEach(child => {
                if(!this.circles.find(circle => circle.node === child)){
                    this.node.removeChild(child);
                }
            });
        }
    }

    removeCircle(circle) {
        this.circles.forEach((item, i) => {
            if (circle === item.node) {
                this.circles.splice(i, 1);
                this.circles = [...this.circles];
            }
        });
    }

    checkCircles() {
        let circlesToDelete;
        this.circles.forEach((item, i) => {
            this.circles.forEach((item2, j) => {
                if(j<=i){
                    return;
                }
                var x1 = item.x + 50;
                var y1 = item.y + 50;
                var x2 = item2.x + 50;
                var y2 = item2.y + 50;
                console.log('item.x',item.x, x1);
                let dist = parseInt(Math.sqrt(Math.pow((Math.abs(x1 - x2)), 2) + Math.pow((Math.abs(y1 - y2)), 2)));
                console.log(dist);
                if (dist < 50) {
                    circlesToDelete = {points:[item, item2], center: [(x1+x2)/2, (y1+y2)/2]};
                }
            })
        });
        if(circlesToDelete){
            console.log(circlesToDelete)
            this.removeCircle(circlesToDelete.points[0].node);
            this.removeCircle(circlesToDelete.points[1].node);
            this.addCircle(circlesToDelete.center[0] , circlesToDelete.center[1]);
        }

    }

    update() {
        this.checkCircles();
        //�������� ��� ������
        // this.circles.forEach((item) => {
        //     if (item === circleNode) {
        //         item.x = x;
        //         item.y = y;
        //     }
        // })
    }


//�������� ���������� ���������, � ����������� � ����� � ���� ���������, ���� ��� �������� �� ������, � ������ ��� � �������
// ������ � ������. ��� ������ ����� ��� �������� ������������, ������ ��� �������� �� ������ ���� ���.
// ���� � ��� ��������� �������� �� ������� �����, �� ������ �������� addCircles/ ������ � ���������
// �� ������ ���������� ����������
// � ������� - ����� ����, � ����� � ��� ���� ������, ����� �� �������, � ���� � ��� ���-�� ������ �������� ������,
// ������� ��� ������ � ������� �����
// ����� ����� ����� ������� ��� ������. � ��� ����� ������� checkCircles(), ������� ����� �� ���� ����������� �
// ������� ������, ��������� ������� �� �� �������� � ���� ��� ������, �� ������� � ������� ����� �����

// � ������, ����������� ��� ���� ���� ����. ����� ����� ����� �� ���������? ����� � � ������������ � ����� -
// �� ���������. � � ����� �� ������� �����, ������� ���������� update. � ����� �� �������� ����, ������
// ����� ��� ����� ����� �������� ����� update(), ����� ������� ���� ����� ��������, ��� ����� ����������� �
// ������ ��������� ��� ��������. ����� update() ������ ���� � �����. �� ������ �������� ����, �� ����� ������
// � ����� �� ���� ������,  � ����� ����� �������� ����� - � ���������. ������� ��������.

// ���� ������ ������
// �������� � ����������� ������� ������, ������� ����� ����� �������� ����� ���-�� ����������. � ����� �� �������
// ����� � �����, �� ����� ���������� � ������ ������� ����������, ������ ��� ������ ���� ����������, ����� ��� �� ���������
//


}
;

setTimeout(() => {
    let node = document.createElement('div');
    let body = document.querySelector('body');
    let field = new Field(node);
    body.appendChild(field.node);
}, 0);





//
// circle = new Circle(x, y);
// field.circles = field.circles.concat(circle);
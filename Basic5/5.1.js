class Container {
    constructor (){

    }
    updateActivePopup (popup) {
        if(this.active){
            this.active.hide();
        }
        this.active = popup;
    }
};

class Popup {
    constructor (node){
        this.node = node;
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');
        this.overlay.appendChild(this.node);
        this.overlay.style.display = 'none';
        this.overlay.addEventListener('click', ()=>{this.hide()});
        this.body = document.querySelector('body');
        this.body.appendChild(this.overlay);
}
static cont = new Container();
show () {
    Popup.cont.updateActivePopup (this);
    this.overlay.style.display = 'block';
}
hide () {
    this.overlay.style.display = 'none';
}
};


const popup1 = new Popup(document.querySelector('.some-selector'));
popup1.show();
//popup1.hide();

const popup2 = new Popup(document.querySelector('.some-selector2'));
popup2.show();
/**
 * Created by Ko$ on 24.03.2016.
 */
class Light {
    constructor(red, yellow, green) {
        this.red = red;
        this.yellow = yellow;
        this.green = green;
        this.time = 1;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
        setTimeout(() => this.render());
    }

    render() {
        let tick = this.time % 47;

        if (tick >= 1 && tick <= 19){
            this.red.classList.add('active');
            this.yellow.classList.remove('active');
            this.yellow.classList.add('redText');
            this.yellow.classList.remove('greenText');
            this.green.classList.remove('active');
            this.yellow.textContent = 23 - tick;
        }
        if (tick >= 20 && tick <= 22){
            this.red.classList.add('active');
            this.yellow.classList.add('active');
            this.yellow.classList.remove('redText');
            this.yellow.classList.remove('greenText');
            this.green.classList.remove('active');
        }
        if (tick >= 23 && tick <= 44){
            this.red.classList.remove('active');
            this.yellow.classList.remove('active');
            this.yellow.classList.remove('redText');
            this.yellow.classList.add('greenText');
            this.green.classList.add('active');
            this.yellow.textContent = 45 - tick;
        }
        if (tick >= 45 && tick <= 47){
            this.red.classList.remove('active');
            this.yellow.classList.add('active');
            this.yellow.classList.remove('redText');
            this.yellow.classList.remove('greenText');
            this.green.classList.remove('active');
        }
    }
};


const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');


const light = new Light (red, yellow, green);

setInterval(()=>light.time++, 1000)
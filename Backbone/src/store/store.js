export default class Store {
    constructor (token){
        this.token = token;
    }
    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }
};


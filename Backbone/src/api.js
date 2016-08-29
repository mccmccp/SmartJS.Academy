const api = {
    token:
        '',
    login: function (email, pass) {
        return fetch('http://tasks.smartjs.academy/login', {
            method: 'post',
            body: JSON.stringify({email: email, password: pass}),
            headers: {'Content-Type': 'application/json'}
        })
    },
    validateEmail: function (email){
        return fetch('http://tasks.smartjs.academy/validate/email', {
            method: 'post',
            body: JSON.stringify({email: email}),
            headers: {'Content-Type': 'application/json'}
        })
    },
    registrationUser: function (email, pass) {
        return fetch('http://tasks.smartjs.academy/users', {
            method: 'post',
            body: JSON.stringify({email: email, password: pass}),
            headers: {'Content-Type': 'application/json'}
        })
    },
    activate: function (userId) {
        return fetch('http://tasks.smartjs.academy/users/' + userId + '/activate', {
            method: 'post',
            headers: {'Authorization': 'Bearer' + ' ' + this.token}
        })
    },
    deactivate: function (userId) {
        return fetch('http://tasks.smartjs.academy/users/' + userId + '/deactivate', {
            method: 'post',
            headers: {'Authorization': 'Bearer' + ' ' + this.token}
        })
    },
    getUsers: function (page) {
        return fetch('http://tasks.smartjs.academy/users/?skip=' + page*20 , {
            method: 'get',
            headers: {'Authorization': 'Bearer' + ' ' + this.token}
        })
    },
    // paginationSkip: function (pageNumber) {
    //   console.log(22)
    //     return fetch('http://tasks.smartjs.academy/users/?skip=' + pageNumber*20 , {
    //         method: 'get',
    //     })
    // },
};

export default api;

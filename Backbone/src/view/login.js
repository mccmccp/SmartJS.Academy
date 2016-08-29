import PopupView from './popupView';
import loginTemplate from './login.html';
import store from '../index';
import api from '../api';


var LoginView = PopupView.extend({
    events: {
        "submit form": "getUserData",
    },
    template: loginTemplate,
    rememberMe: function (input, user){
        sessionStorage.setItem('user', JSON.stringify(user));
        if(input.is(':checked')){
            localStorage.setItem('user', JSON.stringify(user));
        }
    },
    navigateRoute: function (response) {
        if (response.user.isAdmin) {
            window.app.navigate("admin", {trigger: true});
        } else {
            window.app.navigate("user", {trigger: true});
        }
    },
    getUserData: function (event) {
        event.preventDefault();
        const email = this.$el.find("#email").val();
        const pass = this.$el.find('#password').val();
        const checkbox = this.$el.find("input[type=checkbox]");
        console.log(api.login);
        api.login(email, pass)
            .then(response => {
                return response.json()
            })
            .then((responseJson)=> {
                console.log();
                api.token = responseJson.token;
                this.rememberMe(checkbox, responseJson);
                this.navigateRoute(responseJson);
            });
    }
});

export default LoginView;

import PopupView from './popupView';
import registrationTemplate from './registration.html';
import {checkValidation, errorMessages} from '../helpers/handleErrors'
import api from '../api';

var RegistrationView = PopupView.extend({
    events: {
        "submit form": "validateFormValues",
        "blur input": "handleEvent",

    },
    template: registrationTemplate,
    validateFormValues: function (event) {
        event.preventDefault();
        const email = this.$el.find("#email").val();
        const pass = this.$el.find('#password').val();
        api.validateEmail(email)
            .then(response => {
                return response.json()})
            .then((responseJson)=> {
                if (responseJson.success) {
                    api.registrationUser(email, pass)
                        .then(()=>{
                            this.resolve(this);
                        })
                } else {
                    this.showErrorFromServer(responseJson.errors); 
                }
            });
        // const passConf = this.$el.find('#confirm-password').val();
        // if (reg.test(pass) && pass === passConf && pass.length >= 6 && correctMail(email)) {
        //     event.preventDefault();
        //     fetch('http://tasks.smartjs.academy/validate/email', {
        //         method: 'post',
        //         body: JSON.stringify({email: email}),
        //         headers: {'Content-Type': 'application/json'}
        //     })
        //         .then(response => response.json())
        //         .then((response)=> {
        //             if (response.success) {
        //                 fetch('http://tasks.smartjs.academy/users', {
        //                     method: 'post',
        //                     body: JSON.stringify({email: email, password: pass}),
        //                     headers: {'Content-Type': 'application/json'}
        //                 })
        //                     .then((response) => {
        //                         this.resolve();
        //                     })
        //             }
        //         })
        // } else {
        //     if (!(reg.test(pass) && pass === passConf && pass.length >= 6)) {
        //         $(":password").css("outline", "2px solid red")
        //         event.preventDefault();
        //     }
        //     if (!correctMail(this.$el.find("#email").val())) {
        //         $("input[name='email']").css("outline", "2px solid red")
        //         event.preventDefault();
        //     }
        // }

    },
    handleEvent: function (event) {
        const flagError = checkValidation(event.target.name, event.target.value);
        if (!flagError) {
            this.showError(event.target.name)
        } else {
            this.hideError(event.target.name)
        }
    },
    showError: function (name, error) {
        this.$el.find('span[data-' + name + ']').html(errorMessages[error || name]).fadeIn();
    },
    showErrorFromServer: function (errors) {
        for (let key in errors){
            if(errors.hasOwnProperty(key)){
                this.showError(key, errors.email);
            }
        }
    },
    hideError: function (name) {
        this.$el.find('span[data-' + name + ']').html('').fadeOut();
    }
});

export default RegistrationView;

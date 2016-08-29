import RegistrationView from '../view/registration';
import SuccessView from '../view/successPopup';
import LoginView from '../view/login';
import ConfirmView from '../view/confirmPopup';




export function openRegistrationPopUp(container = 'body'){
    const regPopup = new RegistrationView();
    $(container).append(regPopup.$el);
    regPopup.render();
    return regPopup.promise
        .then(()=>regPopup.closePopUp()
        )
}

export function openSuccessPopUp(container = 'body'){
    const successPopUp = new SuccessView();
    $(container).append(successPopUp.$el);
    successPopUp.render();
    return successPopUp.promise;
}

export function openLoginPopUp(container = 'body'){
    const loginPopUp = new LoginView();
    $(container).append(loginPopUp.$el);
    loginPopUp.render();
    return loginPopUp.promise;
}

export function openConfirmPopUp(container = 'body'){
    const confirmPopup = new ConfirmView();
    $(container).append(confirmPopup.$el);
    confirmPopup.render();
    return confirmPopup.promise
        .then(()=>confirmPopup.closePopUp()
    )
}

export function openPopUp(type, container = 'body'){
    const popup = new type();
    $(container).append(popup.$el);
    popup.render();
    return popup.promise;
}


// const popUpManager = {
//     openRegistrationPopUp: function (container = 'body') {
//         const regPopup = new RegistrationView();
//         $(container).append(regPopup.$el);
//         regPopup.render();
//         return regPopup.promise;
//     },
//     openSuccessPopUp: function (container = 'body') {
//         const regPopup = new RegistrationView();
//         $(container).append(regPopup.$el);
//         regPopup.render();
//         return regPopup.promise;
//     }



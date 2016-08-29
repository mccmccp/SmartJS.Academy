import PopupView from './popupView';
import confirmPopupTemplate from './confirmPopup.html';

var ConfirmView = PopupView.extend({
    events: {
        "click #confirm": "activateUser",
        //"change input[type=checkbox]": "rememberMe"
    },
    template: confirmPopupTemplate,
    activateUser: function () {
        this.resolve();
    }
});

export default ConfirmView;
import PopupView from './popupView';
import successTemplate from './successPopup.html';


var SuccessView = PopupView.extend({
    template: successTemplate,
});

export default SuccessView;
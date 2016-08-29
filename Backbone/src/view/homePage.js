import { View } from 'backbone';
import homePageTemplate from './homePage.html'
import { openRegistrationPopUp, openSuccessPopUp, openLoginPopUp } from '../helpers/popupManager';
import getUser from '../helpers/getUser';

const homePageView = View.extend({
  initialize: function() {
    const user = getUser();
    if(!user){
      return;
    }
    if (user.user.isAdmin) {
      window.app.navigate("admin", {trigger: true});
    } else {
      window.app.navigate("user", {trigger: true});
    }
  },
  render: function() {
    this.$el.html(homePageTemplate);
    return this;
  },
  events:{
    "click #registration":'openRegPopUp',
    "click #login":'openLogPopUp'
  },
  openRegPopUp: function(){
    openRegistrationPopUp()
        .then(()=>{
          openSuccessPopUp()
          });
        //.catch(function(){alert(123)});
  },
  openLogPopUp: function () {
    openLoginPopUp();
  }
  });

export default homePageView;

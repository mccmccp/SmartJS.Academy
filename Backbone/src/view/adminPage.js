import {View} from 'backbone';
import adminPageTemplate from './adminPage.html';
import adminItemTemplate from './adminItemTamplate.html';
import {openConfirmPopUp} from '../helpers/popupManager'
import api from '../api';
import getUser from '../helpers/getUser';
import logout from '../helpers/logout';
import UsersCollection from '../collection/usersCollection';



const AdminPageView = View.extend({
    initialize: function () {
        const user = getUser();
        if (!user) {
            window.app.navigate("", {trigger: true});
        } else if (!user.user.isAdmin) {
            window.app.navigate("user", {trigger: true});
        }
        this.getUsersList();

    },
    getUsersList: function () {
        this.collection = new UsersCollection();
        this.collection.fetch();
        this.collection.on('reset', this.render, this);
    },
    render: function (data) {
        this.$el.html(adminPageTemplate);
        const userList = this.$el.find('#userList');
        let paginationList = this.$el.find('.pagination');
        const documentFragmentPagin = $(document.createDocumentFragment());
        const quantityOfPagEl = Math.ceil(this.collection.totalPages / 20);
        for(let t = 0; t < quantityOfPagEl; t++ ){
          let paginLi = document.createElement('li');
          let paginLiA = document.createElement('a');
          $(paginLiA).html(t+1);
            if(t+1 === this.collection.activePage){
                paginLi.classList.add('active')
            }
          paginLi.appendChild(paginLiA);
          documentFragmentPagin.html(paginLi )


        }

        paginationList.html(documentFragmentPagin)
        const documentFragment = $(document.createDocumentFragment());
        data.forEach(i => {

            const item = i.attributes;

            let itemTemplate = $(adminItemTemplate);
            itemTemplate.find('.userEmail').html(item.email);
            itemTemplate.find('.btn').data('userData', {id: item.id, activated: item.activated,});
            itemTemplate.css('border', '1px solid #999');
            if (item.activated) {
                itemTemplate.find('input[type=checkbox]').prop('checked', true);
                itemTemplate.css('background', '#7FFF00');
            } else {
                itemTemplate.css('background', 'red');
            }
            documentFragment.html(itemTemplate);
        });
        userList.html(documentFragment);
        return this;

    },
    changeUserActivation: function (event) {
        let activatedId = $(event.target).data('userData').id;
        openConfirmPopUp()
            .then(()=> {
                api.activate(activatedId)
            })
    },
    logout: function(){
        logout();
        this.$el.remove();
    },
    paginationSkip: function(event){
      this.collection.fetch(+event.target.text-1);
      this.collection.on('reset', this.render, this);
        this.collection.activePage = +event.target.text;
    },
    events: {
        "click #logout": 'logout',
        "click .btn": 'changeUserActivation',
        "click .pagination li a": 'paginationSkip',

    }
});

export default AdminPageView;

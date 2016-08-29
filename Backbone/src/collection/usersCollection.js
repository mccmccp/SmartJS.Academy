import {Collection} from 'backbone';
import api from '../api';
import userModel from '../model/usersModel'


const UserCollection = Collection.extend({
    fetch: function (page) {
        api.getUsers(page)
            .then((response)=> {
                return response.json();
            }).then((responseJson)=> {
              this.totalPages = responseJson.total;
            this.reset(responseJson.page);
        })
    },
    model: userModel,
    activePage: 1,
});


export default UserCollection;

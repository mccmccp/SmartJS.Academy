import { View } from 'backbone';
import userTemplate from './userTemplate.html';

const UserPageView = View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(userTemplate);
    },
    events:{

    }
});

export default AdminPageView;

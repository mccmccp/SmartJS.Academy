import { View } from 'backbone';

const PopupView = View.extend({
    initialize: function () {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    },
    closePopUp: function () {
        this.$el.find('#regform')
            .modal('hide');
    },
    render: function () {
        this.$el.html(this.template);
        this.$el.find('[role="dialog"]')
            .modal('show')
            .on('hide.bs.modal', () => this.remove());
    }
});

export default PopupView;
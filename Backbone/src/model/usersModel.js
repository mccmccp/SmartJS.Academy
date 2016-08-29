import { Model } from 'backbone';
import api from '../api'

const userModel = Model.extend ({
    activate: api.activate,
    deactivate: api.deactivate,
});

export default userModel;

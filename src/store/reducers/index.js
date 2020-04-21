import { combineReducers } from 'redux';
import authReducer from '../../auth/reducers/authReducer';

export default combineReducers(
    {
        auth: authReducer
    }
)
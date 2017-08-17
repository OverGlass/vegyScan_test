import { combineReducers } from 'redux';
import auth from './auth_reducer';
import vegies from './vegies_reducer';
import scan from './scan_reducer';

const rootReducer = combineReducers({
    auth,
    vegies,
    scan
});

export default rootReducer;
import {createStore} from 'redux';
import rootReducer from '../reducers';
import { loadData } from '../localStorage';

const persistedData = loadData();
console.log(persistedData,'per')
const store = createStore(rootReducer, persistedData);

export default store;
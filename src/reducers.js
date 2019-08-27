import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { applications } from './applicationsReducer'


export default combineReducers({ 
    applications
});
//import { FETCH_ALL_POSTS, VOTE_ON_POST, DELETE_POST, SELECT_POST, CREATE_POST, EDIT_POST } from '../actions/actionTypes'
//import { UPDATE_COMMENTS_FOR_POST, ADD_COMMENT_TO_POST, DELETE_COMMENT, EDIT_COMMENT_TO_POST } from '../actions/actionTypes'

import { SET_APP_GUID, SAVE_WORKFLOW } from './actions/actionTypes'

const initialPostsState = {
    guid: ''
}

export function applications (state = initialPostsState, action) {
    switch(action.type) {
        case SET_APP_GUID: {
             return {
                 ...state,
                 guid: action.guid
             }
         }
         case SAVE_WORKFLOW: {
             return {
                 ...state,
                 workflow: action.workflow
             }
         }
        default:
            return state;
    }
}
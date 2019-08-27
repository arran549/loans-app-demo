import { SET_APP_GUID, GET_WORKFLOW } from'./actionTypes'

export const setApplicationGuid = (guid) => {
    console.log("guid", guid)
    return {
        type: SET_APP_GUID,
        guid
    }
}


export const setWorkflow = (workflow) => {
    return {
        type: GET_WORKFLOW,
        identifier: workflow.identifier,
        workflow
    }
}
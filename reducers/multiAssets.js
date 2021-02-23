export default function multiAssetsReducer(state = {}, action) {
    switch(action.type) {
        case 'UPDATE_multiAssets':
            return action.payload
        default:
            return state
    }
}
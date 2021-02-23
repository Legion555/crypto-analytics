export default function singleAssetReducer(state = {}, action) {
    switch(action.type) {
        case 'UPDATE_singleAsset':
            return action.payload
        default:
            return state
    }
}
import {combineReducers} from 'redux'
import multiAssetsReducer from './multiAssets'
import singleAssetReducer from './singleAsset'

const rootReducer = combineReducers({
    multiAssets: multiAssetsReducer,
    singleAsset: singleAssetReducer
})

export default rootReducer
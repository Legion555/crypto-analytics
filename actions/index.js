export const updateMultiAssets = data => {
    return {
        type: 'UPDATE_multiAssets',
        payload: data
    }
}

export const updateSingleAsset = data => {
    return {
        type: 'UPDATE_singleAsset',
        payload: data
    }
}
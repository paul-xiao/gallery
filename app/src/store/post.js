const post = {
    state: {
        uploadStatus: false
    },
    mutations: {
        UPDATE_UPLOAD_STATUS(state, status) {
            console.log(status)
            state.uploadStatus = status
        }
    },
    actions: {

    },
    getters: {
        uploadStatus: state => state.uploadStatus
    }
} 


export default post
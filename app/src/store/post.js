const post = {
    state: {
        uploadStatus: false,
        uploadFiles: {}
    },
    mutations: {
        UPDATE_UPLOAD_STATUS(state, status) {
            state.uploadStatus = status
        },
        UPDATE_UPLOAD_FILES(state, files) { 
            state.uploadFiles =  Object.values(files).map(file => {
                return {
                    name:file.name, 
                    lastModified: file.lastModified,
                    size: file.size,
                    link: URL.createObjectURL(file),
                    type: file.type
                 }
            });
        }
    },
    actions: {
    //    ADD_POST({state, commit}, file) {

    //    }
    },
    getters: {
        uploadStatus: state => state.uploadStatus,
        uploadFiles: state => state.uploadFiles
    }
} 


export default post
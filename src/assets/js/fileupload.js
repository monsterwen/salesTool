import * as axios from 'axios'

const FILE_URL = 'http://10.4.3.17:3000'
// const BASE_URL = 'http://localhost:3000'
function upload (formData) {
    const url = `${FILE_URL}/file_upload`
    return axios.post(url, formData)
}


export { upload }
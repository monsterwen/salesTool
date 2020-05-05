/**
 * Created by amerrill on 12/21/17.
 */

import * as axios from 'axios'


const BASE_URL = 'http://10.4.3.18:9080/api/v1/Sales/signup'
//  const BASE_URL = 'http://localhost:8000/api/v1/jobs/jobhistory'
function insertUser (formData) {
    const url = BASE_URL
    // const url = 'http://localhost:8000/api/v1/jobs/job'
    return axios.post(url, formData)
}

export { insertUser}

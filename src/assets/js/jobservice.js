import * as axios from 'axios'

function submitJob (formData) {
    const url = 'https://10.4.3.18:9089/api/v1/jobs/salestool'
    return axios.post(url, formData)
}
function getAnalysis () {
    const url = 'https://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/output1598975366291.txt/Dimension/Analytics'
    // const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' +jobid +'/Dimension/Analytics'
    return axios.get(url)
}
function getInsights (jobid) {
    const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' +jobid +'/Dimension/INSIGHTS'
    return axios.get(url)
}
function getStrategy () {
    const url = 'https://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/output1598975366291.txt/Dimension/Strategy'
    // const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' +jobid +'/Dimension/Strategy'
    return axios.get(url)
}

export {getAnalysis, getInsights, getStrategy,submitJob}

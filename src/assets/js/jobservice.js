import * as axios from 'axios'

function submitJob (formData) {
    const url = 'http://10.4.3.18:9089/api/v1/jobs/salestool'
    return axios.post(url, formData)
}
function getAnalysis (jobid) {
    const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' +jobid +'/Dimension/ANALYSIS'
    return axios.get(url)
}
function getInsights (jobid) {
    const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' +jobid +'/Dimension/INSIGHTS'
    return axios.get(url)
}
function getStrategy (jobid) {
    const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' +jobid +'/Dimension/STRATEGY'
    return axios.get(url)
}

export {getAnalysis, getInsights, getStrategy,submitJob}

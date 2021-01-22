import * as axios from 'axios'

function submitJob (formData) {
    const url = 'http://10.4.3.18:9089/api/v1/jobs/salestool'
    return axios.post(url, formData)
}
function getAnalysis (jobid) {
    console.log(jobid)
    // const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/output1598975366291.txt/Dimension/Analytics'
    const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' + jobid +'/Dimension/Analytics'
    return axios.get(url)
}
function getInsights (jobid) {
    const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' + jobid +'/Dimension/INSIGHTS'
    return axios.get(url)
}
function getStrategy (jobid) {
    console.log(jobid)
    // const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/output1598975366291.txt/Dimension/Strategy'
    const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/' + jobid +'/Dimension/Strategy'
    return axios.get(url)
}

function signUp (payload) {
    // const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/output1598975366291.txt/Dimension/Strategy'
    const url = 'https://fastdiagnostic.brierley.com/api/v1/Diagnostic/signup'
    return axios.post(url, payload)
}
function salesEmail (payload) {
    // const url = 'http://10.4.3.18:9062/api/v1/Diagnostic/salesRecommendation/JobId/output1598975366291.txt/Dimension/Strategy'
    const url = 'https://fastdiagnostic.brierley.com/api/v1/Diagnostic/salesEmail'
    return axios.post(url, payload)
}

export {getAnalysis, getInsights, getStrategy,submitJob, signUp, salesEmail}

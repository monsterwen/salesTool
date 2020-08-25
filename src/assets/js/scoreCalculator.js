
function getScores(questions) {

    let questionTotals = {
        analysis: 0,
        strategy: 0
    }

    let questionResponse = {
        analysis: {
            Yes: 0,
            No: 0,
            'N/A': 0
        },
        strategy: {
            Yes: 0,
            No: 0,
            'N/A': 0
        }
    }
    let scores = {
        analysis: {
            current: 0,
            target: 0
        },
        strategy: {
            current: 0,
            target: 0
        },
    }
    questions.forEach((question) => {
        questionTotals[question.type] = questionTotals[question.type] + 1
        questionResponse[question.type][question.response] = questionResponse[question.type][question.response] + 1
    })

    if (questionResponse.analysis['N/A'] !== questionTotals.analysis) {
        scores.analysis.current = (questionResponse.analysis.Yes / (questionTotals.analysis - questionResponse.analysis['N/A'])) * 5
        scores.analysis.target = (Math.min(questionResponse.analysis.Yes + 2, (questionTotals.analysis - questionResponse.analysis['N/A']))
            / (questionTotals.analysis - questionResponse.analysis['N/A'])) * 5
    }
    if (questionResponse.strategy['N/A'] !== questionTotals.strategy) {
        scores.strategy.current = (questionResponse.strategy.Yes / (questionTotals.strategy - questionResponse.strategy['N/A'])) * 5
        scores.strategy.target = (Math.min(questionResponse.strategy.Yes + 2, (questionTotals.strategy - questionResponse.strategy['N/A']))
            / (questionTotals.strategy - questionResponse.strategy['N/A'])) * 5
    }

    return scores
}

export { getScores }
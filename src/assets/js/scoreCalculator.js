
function getScores(questions) {

    let questionTotals = {
        analytics: 0,
        strategy: 0
    }

    let questionResponse = {
        analytics: {
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
        analytics: {
            current: 0,
            target: 0
        },
        strategy: {
            current: 0,
            target: 0
        },
        average: {
            current: 0,
            target: 0
        },
    }
    questions.forEach((question) => {
        questionTotals[question.type] = questionTotals[question.type] + 1
        questionResponse[question.type][question.response] = questionResponse[question.type][question.response] + 1
    })
    console.log('qiestion', questions)
    if (questionResponse.analytics['N/A'] !== questionTotals.analytics) {
        scores.analytics.current = (questionResponse.analytics.Yes / (questionTotals.analytics)) * 5
        scores.analytics.target = (Math.min(questionResponse.analytics.Yes + 2, (questionTotals.analytics))
            / (questionTotals.analytics - questionResponse.analytics['N/A'])) * 5
        console.log('analytics', scores)
    }
    if (questionResponse.strategy['N/A'] !== questionTotals.strategy) {
        scores.strategy.current = (questionResponse.strategy.Yes / (questionTotals.strategy)) * 5
        scores.strategy.target = (Math.min(questionResponse.strategy.Yes + 2, (questionTotals.strategy - questionResponse.strategy['N/A']))
            / (questionTotals.strategy - questionResponse.strategy['N/A'])) * 5
        console.log('strategy', scores)
    }
    scores.average.current = (scores.strategy.current + scores.analytics.current) / 2
    scores.average.target = (scores.strategy.target + scores.analytics.target) / 2

    console.log('scores', scores)
    return scores
}

function getRecommendations(questions, recData) {
    // let recData = {
    //     1: {
    //         id: 1,
    //         rank: 1,
    //         name: 'Program Health Assessment',
    //         gapDesc: 'Benchmarking your program’s performance',
    //         soYouHeader: 'See how your program measures up',
    //         soYouDesc: 'We score your program on key performance metrics and compare the results to industry benchmarks, identifying next actionable steps to increase customers’ lifetime value.',
    //         includes: [
    //             'KPI scorecard and benchmarks',
    //             'Customer Pareto analysis and product indexing',
    //             'Customer life cycle segmentation and migration analysis',
    //             'Leaky bucket diagnostic (BALOR report card)',
    //             'Readout and consulting session'
    //         ]
    //     },
    //     2: {
    //         id: 2,
    //         rank: 2,
    //         name: 'Program Cost-Benefit Analysis',
    //         gapDesc: 'Quantifying your program’s profitability and ROI',
    //         soYouHeader: 'Discover if your program is profitable',
    //         soYouDesc: 'We provide a comprehensive, objective evaluation of program benefits (incremental revenue) and costs to measure your return on investment and identify your greatest opportunities for growth.',
    //         includes: [
    //             'Incremental Revenue/Lift Analysis (Dual Methodology: Matched Cohort Analysis and Econometric Model)',
    //             'Itemized cost ledger',
    //             'Cost-benefit and roi summary',
    //             'Segment/Driver profitability profile',
    //             'Readout and consulting session'
    //         ]
    //     },
    //     3: {
    //         id: 3,
    //         rank: 3,
    //         name: 'Core Customer Segmentation',
    //         gapDesc: 'Personalizing marketing through clear and distinct customer segments',
    //         soYouHeader: 'Know your customers and how to speak to them',
    //         soYouDesc: 'We group your customers into actionable types and work directly with you to identify a topline solution for optimizing marketing and communications.',
    //         includes: [
    //             'Core customer segmentation with robust profiles',
    //             'Presentation deck identifying methodology and scoring',
    //             'Collaborative work sessions to audition multiple algorithms and solutions',
    //             'Consulting and communications planning sessions'
    //         ]
    //     },
    //     4: {
    //         id: 4,
    //         rank: 4,
    //         name: 'Customer Demographic Profiling',
    //         gapDesc: 'Identifying and actioning your customers’ demographics',
    //         soYouHeader: 'B-Informed by your best customers',
    //         soYouDesc: 'We leverage specific data about your customer base to identify key segments and traits, informing marketing tactics for existing.',
    //         includes: [
    //             'Demographic overlay file of customer base using Experian ConsumerView',
    //             'Up to 5 infographics for key segments/targets',
    //             'Interactive dashboard suite for generating queries and profiles'
    //         ]
    //     },
    //     5: {
    //         id: 5,
    //         rank: 5,
    //         name: 'Brand & Program Tracker',
    //         gapDesc: 'Establishing customer perception of the CRM/Loyalty program',
    //         soYouHeader: 'Ask your customers the important questions',
    //         soYouDesc: 'We group your customers into actionable types and work directly with you to identify a topline solution for optimizing marketing and communications.',
    //         includes: [
    //             'Survey of current customers tailored to business needs',
    //             'Presentation deck identifying trends, benchmarking, insights, and scoring responses',
    //             'Interactive dashboard for user queries and drill-down'
    //         ]
    //     },
    //     6: {
    //         id: 6,
    //         rank: 6,
    //         name: 'Propensity Modeling',
    //         gapDesc: 'Leveraging predictive analytics to inform marketing efforts',
    //         soYouHeader: 'Bring predictive power to your marketing efforts',
    //         soYouDesc: 'We develop precision models from your current customer data to determine best actions for increasing response and driving the profitable behaviors that matter most to your business',
    //         includes: [
    //             'Bundle of 3 predictive models tailored to your specific business needs',
    //             'Presentation deck identifying methodology, scoring, validation, insight/profiles, and strategic use cases',
    //             'Scoring code and algorithms that become your IP',
    //             'Consulting and strategy session'
    //         ]
    //     },
    //     7: {
    //         id: 7,
    //         rank: 7,
    //         name: 'Proactive Churn Modeling',
    //         gapDesc: 'Addressing the traits of your customers',
    //         soYouHeader: 'Retain your customers and maximize their value',
    //         soYouDesc: 'Our experts analyze your company’s data to identify at-risk customers and determine cost-effective, highly personalized retention campaigns for your business',
    //         includes: [
    //             'Proactive churn model with time-risk and potential value scores',
    //             'Presentation deck identifying methodology, scoring, validation, insights/profiles, and strategic use cases',
    //             'Scoring code and algorithms that become your own IP',
    //             'Consulting and strategy session',
    //         ]
    //     },
    //     8: {
    //         id: 8,
    //         rank: 8,
    //         name: 'Lifetime Value Modeling',
    //         gapDesc: 'Optimizing marketing efforts against each customer’s lifetime value',
    //         soYouHeader: 'Know what your customers are worth',
    //         soYouDesc: 'Brierley’s team forecasts the future value of each customer to your brand, enabling you to make strategic decisions with your marketing funds and optimize returns',
    //         includes: [
    //             'Customer Lifetime Value Model Comprised of Annual Spend/Profit, Retention Rate, and CLV Scores',
    //             'Presentation Deck Identifying Methodology, Scoring, Assumptions, Validation, Insights/Profiles, and Strategic Use Cases',
    //             'Scoring code and algorithms that become your own IP',
    //             'Consulting and Strategy Session'
    //         ]
    //     },
    //     9: {
    //         id: 9,
    //         rank: 9,
    //         name: 'Personalized Product Recommendations',
    //         gapDesc: 'Prescribing next best product for each customer',
    //         soYouHeader: 'Keep customers engaged with next best action insights',
    //         soYouDesc: 'Using customer-centric data, we identify purchase patterns and utilize proprietary tools to rank product recommendations for highly personalized and prescriptive campaigns',
    //         includes: [
    //             'Topline products diagnostic bundle, including cross-sell patterns, item-item association metrics, heat map, and stickiness recommendations',
    //             'Customer-centric recommendation scores rank-ordered by relevance for up to 20 products/categories',
    //             'Presentation deck identifying methodology, insights, and use cases',
    //             'Consulting and strategy session'
    //         ]
    //     },
    //     10: {
    //         id: 10,
    //         rank: 10,
    //         name: 'KPI/Metric Audit & Dashboard Design',
    //         gapDesc: 'Tracking against business objectives with compelling dashboards',
    //         soYouHeader: 'Stay on track to meet your business objectives',
    //         soYouDesc: 'Our experts work with you to evaluate and enhance your existing BI reports and dashboards, ensuring you cleanly track the most actionable KPIs for your business',
    //         includes: [
    //             'Full evaluation of existing marketing bi/reports',
    //             'Prescriptions and recommendations for additional metrics/measurement, benchmarks, and goals',
    //             'Executive dashboard design (wireframes, metadata/aggregation design/code) built using sample customer data',
    //             'Interactive consulting and design session'
    //         ]
    //     },
    //     11: {
    //         id: 11,
    //         rank: 11,
    //         name: 'Analytic Vision & Roadmap',
    //         gapDesc: 'Following an analytic roadmap aligned with your business vision',
    //         soYouHeader: 'Put your data to work toward your business goals',
    //         soYouDesc: 'Our experts collaborate with your team to review your existing analytic solutions and craft an actionable analytic roadmap that informs your strategic efforts and aligns with your growth plan',
    //         includes: [
    //             'Topline Review of Existing Analytic Set',
    //             'Joint Ideation and Planning Sessions for Business Goal and Analytic Alignment',
    //             'Detailed 3-year analytic roadmap and implementation guide'
    //         ]
    //     },
    //     12: {
    //         id: 12,
    //         rank: 12,
    //         name: 'Competitive Evaluation',
    //         gapDesc: 'Addressing gaps and differentiating your program from the competition',
    //         soYouHeader: 'Distinguish yourself from the competition',
    //         soYouDesc: 'By assessing the loyalty landscape and competitors’ offerings, we identify gaps in the market and recommend ways to differentiate your program.',
    //         includes: [
    //             'Presentation deck identifying industry trends and benchmarks',
    //             'Competitor scorecards and rankings',
    //             'Scatter map indexing competitive landscape',
    //             'Recommendation of differentiating program features'
    //         ]
    //     },
    //     13: {
    //         id: 13,
    //         rank: 13,
    //         name: 'CX/MX Journey Mapping',
    //         gapDesc: 'Optimizing customer experience flow across all key touchpoints',
    //         soYouHeader: 'Experience your customers’ journeys',
    //         soYouDesc: 'Leverage all available data to map and evaluate your customer journey, recommending strategies for improvement, and generating actionable insights',
    //         includes: [
    //             'Collaborative work sessions to map out touchpoints and key moments',
    //             'Optimized customer journey map informed by T.A.R.G.E.T. (Touchpoint And Relationship Gap Evaluation Tool)',
    //             'Recommendations for enhancements to address gaps and redundancies'
    //         ]
    //     },
    //     14: {
    //         id: 14,
    //         rank: 14,
    //         name: 'Loyalty Ideation Workshop',
    //         gapDesc: 'Leveraging an idea bank to actively enhance your CRM/Loyalty program',
    //         soYouHeader: 'Transform ideas into actionable insights',
    //         soYouDesc: 'Through an ideation exercise with key stakeholders, we will take the lead in turning abstract ideas into a list of program concepts and immediate enhancements',
    //         includes: [
    //             'Categorized idea bank',
    //             'Level of effort/impact matrix',
    //             'Straw-man program concepts',
    //             'Quick wins for program enhancement'
    //         ]
    //     },
    //     15: {
    //         id: 15,
    //         rank: 15,
    //         name: 'Relationship Analyser',
    //         gapDesc: 'Identifying how your customers perceive your CRM/Loyalty efforts',
    //         soYouHeader: 'Discover how customers perceive your relationship',
    //         soYouDesc: 'Employ a specialized set of research questions to gain a better understanding of customer sentiment toward your marketing efforts, loyalty program, and/or CRM initiatives',
    //         includes: [
    //             'Survey of current customers tailored to business needs',
    //             'Index of survey results compared to competitive set',
    //             'Recommendations to strengthen customer relationships',
    //             'Research readout and consulting session'
    //         ]
    //     },
    //     16: {
    //         id: 16,
    //         rank: 16,
    //         name: 'Loyalty Launch & Planning',
    //         gapDesc: 'Following a detailed plan for launching a pilot or revised program',
    //         soYouHeader: 'Get your loyalty program off to a successful start',
    //         soYouDesc: 'This comprehensive resource outlines a pilot program structure, implementation plan, training plan, and post-launch measurement guide tailored to your specific needs',
    //         includes: [
    //             'Launch roadmap with milestones for key stakeholder groups',
    //             'Employee training manual',
    //             'Employee training communications kit',
    //             'SPIF recommendations'
    //         ]
    //     },
    //     17: {
    //         id: 17,
    //         rank: 17,
    //         name: 'Strategic Vision & Roadmap',
    //         gapDesc: 'Detailing a long-term strategic plan and guide to optimize marketing ',
    //         soYouHeader: 'Keep your program relevant',
    //         soYouDesc: 'We will develop a dynamic roadmap to guide program evolution and identify themes for short- and long-term program vision, resulting in a detailed 3-year strategic plan',
    //         includes: [
    //             'Topline review of corporate/brand initiatives and directives',
    //             'Joint ideation and planning sessions for program goals alignment',
    //             'Details 3-year strategic roadmap and implementation guide'
    //         ]
    //     },
    //     18: {
    //         id: 18,
    //         rank: 18,
    //         name: 'Communications Audit',
    //         gapDesc: 'Following a plan to address communications gaps and opportunities',
    //         soYouHeader: 'Find out how your communications stack up',
    //         soYouDesc: 'Our strategy team will inventory customer communications and analyze engagement metrics to identify weaknesses and recommend improvements',
    //         includes: [
    //             'Presentation deck identifying communications trends and benchmarking insights',
    //             'Member communications scorecard',
    //             'Recommendations for enhancements to address gaps and redundancies'
    //         ]
    //     },
    //     19: {
    //         id: 19,
    //         rank: 19,
    //         name: 'Emotional Loyalty Measurement',
    //         gapDesc: 'Tracking your customers’ rational and emotional loyalty to your brand',
    //         soYouHeader: 'Measure both sides of the equation',
    //         soYouDesc: 'Identify the depth of your customers’ emotional and rational connections to your brand and loyalty program with our proprietary Brierley Loyalty Quotient',
    //         includes: [
    //             'Survey of current customers tailored to business needs',
    //             'Interactive BLQ dashboard with rational & emotional measures by brand',
    //             'Recommendations to improve overall BLQ scores'
    //         ]
    //     },
    //     20: {
    //         id: 20,
    //         rank: 20,
    //         name: 'Loyalty Checkup',
    //         gapDesc: 'Contextualizing your program against best-in-class standards',
    //         soYouHeader: 'Give your loyalty program a thorough examination',
    //         soYouDesc: 'Strategists will score existing program elements against best-in-class core design principles and develop recommendations for near-term wins and immediate program enhancements',
    //         includes: [
    //             'Discovery findings summary',
    //             'KPI scorecard and benchmarks',
    //             'Core design principles scorecard',
    //             'Quick wins for program enhancement'
    //         ]
    //     },
    //     21: {
    //         id: 21,
    //         rank: 21,
    //         name: 'Marketing Jumpstart',
    //         gapDesc: 'Executing against a progression of quick win marketing campaigns',
    //         soYouHeader: 'Drive immediate results and learnings',
    //         soYouDesc: 'Optimize your existing program with a suite of targeted loyalty campaigns designed to deliver tangible insights and complement your program design goals',
    //         includes: [
    //             'Marketing quick wins summary',
    //             'Presentation deck for socializing campaigns to internal stakeholders',
    //             'Campaign execution checklist',
    //             'Post-Campaign measurement plan'
    //         ]
    //     },
    //     22: {
    //         id: 22,
    //         rank: 22,
    //         name: 'Next Best Action Marketing Plan',
    //         gapDesc: 'Following a plan to move each customer to her or his next best action',
    //         soYouHeader: 'Motivate customers to take the next step',
    //         soYouDesc: 'Increase customer engagement and grow lifetime value by focusing on a limited, yet impactful, set of behaviors that are mapped to move each customer through a relevant and personalized marketing path',
    //         includes: [
    //             'Optimized set of desired behaviors for customer-centric mapping',
    //             'Personalized marketing plan to motivate next best action',
    //             'Research design, test plan, and measurement scheme'
    //         ]
    //     },
    // }

    let recs = {
        analytics: [],
        strategy: []
    }

    questions.forEach(d => {
        if (d.response === 'No' || d.response === 'N/A') {
            console.log('----', d.type, d)
            recs[d.type].push(recData[d.id])
        }
    })

    return recs
}
export { getScores, getRecommendations }

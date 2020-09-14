
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
    if (questionResponse.analysis['N/A'] !== questionTotals.analysis) {
        scores.analysis.current = (questionResponse.analysis.Yes / (questionTotals.analysis - questionResponse.analysis['N/A'])) * 5
        scores.analysis.target = (Math.min(questionResponse.analysis.Yes + 2, (questionTotals.analysis - questionResponse.analysis['N/A']))
            / (questionTotals.analysis - questionResponse.analysis['N/A'])) * 5
        console.log('analysis', scores)
    }
    if (questionResponse.strategy['N/A'] !== questionTotals.strategy) {
        scores.strategy.current = (questionResponse.strategy.Yes / (questionTotals.strategy - questionResponse.strategy['N/A'])) * 5
        scores.strategy.target = (Math.min(questionResponse.strategy.Yes + 2, (questionTotals.strategy - questionResponse.strategy['N/A']))
            / (questionTotals.strategy - questionResponse.strategy['N/A'])) * 5
        console.log('strategy', scores)
    }
    scores.average.current = (scores.strategy.current + scores.analysis.current) / 2
    scores.average.target = (scores.strategy.target + scores.analysis.target) / 2

    console.log('scores', scores)
    return scores
}

function getRecommendations(questions) {
    let recData = {
        1: {
            id: 1,
            rank: 1,
            name: 'Program Health Assessment',
            gapDesc: 'Benchmarking your program’s performance',
            soYouHeader: 'See how your program measures up',
            soYouDesc: 'We score your program on key performance metrics and compare the results to industry benchmarks, identifying next actionable steps to increase customers’ lifetime value.',
            includes: [
                'KPI Scorecard and Benchmarks',
                'Customer Pareto Analysis and Product Indexing',
                'Customer Life Cycle Segmentation and Migration Analysis',
                'Leaky Bucket Diagnostic (BALOR Report card)',
                'Readout and Consulting Session'
            ]
        },
        2: {
            id: 2,
            rank: 2,
            name: 'Program Cost-Benefit Analysis',
            gapDesc: 'Quantifying your program’s profitability and ROI',
            soYouHeader: 'Discover if your program is profitable',
            soYouDesc: 'We provide a comprehensive, objective evaluation of program benefits (incremental revenue) and costs to measure your return on investment and identify your greatest opportunities for growth.',
            includes: [
                'Incremental Revenue/Lift Analysis (Dual Methodology: Matched Cohort Analysis and Econometric Model)',
                'Itemized Cost Ledger',
                'Cost-Benefit and ROI Summary',
                'Segment/Driver Profitability Profile',
                'Readout and Consulting Session'
            ]
        },
        3: {
            id: 3,
            rank: 3,
            name: 'Core Customer Segmentation',
            gapDesc: 'Personalizing marketing through clear and distinct customer segments',
            soYouHeader: 'Know your customers and how to speak to them',
            soYouDesc: 'We group your customers into actionable types and work directly with you to identify a topline solution for optimizing marketing and communications.',
            includes: [
                'Core Customer Segmentation with Robust Profiles',
                'Presentation Deck Identifying Methodology and Scoring',
                'Collaborative Work Sessions to Audition Multiple Algorithms and Solutions',
                'Consulting and Communications planning Sessions'
            ]
        },
        4: {
            id: 4,
            rank: 4,
            name: 'Customer Demographic Profiling',
            gapDesc: 'Identifying and actioning your customers’ demographics',
            soYouHeader: 'B-Informed by your best customers',
            soYouDesc: 'We leverage specific data about your customer base to identify key segments and traits, informing marketing tactics for existing.',
            includes: [
                'Demographic Overlay File of Customer Base Using Experian ConsumerViewTM',
                'Up to 5 Infographics for Key Segments/Targets',
                'Interactive Dashboard Suite for Generating Queries and Profiles'
            ]
        },
        5: {
            id: 5,
            rank: 5,
            name: 'Brand and Program Tracker',
            gapDesc: 'Establishing customer perception of the CRM/Loyalty program',
            soYouHeader: 'Ask your customers the important questions',
            soYouDesc: 'We group your customers into actionable types and work directly with you to identify a topline solution for optimizing marketing and communications.',
            includes: [
                'Core Customer Segmentation with Robust Profiles',
                'Presentation Deck Identifying Methodology and Scoring',
                'Collaborative Work Sessions to Audition Multiple Algorithms and Solutions'
            ]
        },
        6: {
            id: 6,
            rank: 6,
            name: 'Propensity Modeling',
            gapDesc: 'Leveraging predictive analytics to inform marketing efforts',
            soYouHeader: 'Bring predictive power to your marketing efforts',
            soYouDesc: 'We develop precision models from your current customer data to determine best actions for increasing response and driving the profitable behaviors that matter most to your business',
            includes: [
                'Bundle of 3 Predictive Models (Tailored to Your Specific Business Needs)',
                'Presentation Deck Identifying Methodology, Scoring, Validation, Insight/Profiles, and Strategic Use Cases',
                'Scoring Code and Algorithms (Become your IP)',
                'Consulting and Strategy Session'
            ]
        },
        7: {
            id: 7,
            rank: 7,
            name: 'Proactive Churn Modeling',
            gapDesc: 'Addressing the traits of your customers',
            soYouHeader: 'Retain your customers and maximize their value',
            soYouDesc: 'Our experts analyze your company’s data to identify at-risk customers and determine cost-effective, highly personalized retention campaigns for your business',
            includes: [
                'Proactive Churn Model with Time-Risk and Potential Value Scores',
                'Presentation Deck Identifying Methodology, Scoring, Validation, Insights/Profiles, and Strategic Use Cases',
                'Scoring Code and Algorithms (Become your own IP)',
                'Consulting and Strategy Session',
            ]
        },
        8: {
            id: 8,
            rank: 8,
            name: 'Lifetime Value Modeling',
            gapDesc: 'Optimizing marketing efforts against each customer’s lifetime value',
            soYouHeader: 'Know what your customers are worth',
            soYouDesc: 'Brierley’s team forecasts the future value of each customer to your brand, enabling you to make strategic decisions with your marketing funds and optimize returns',
            includes: [
                'Customer Lifetime Value Model Comprised of Annual Spend/Profit, Retention Rate, and CLV Scores',
                'Presentation Deck Identifying Methodology, Scoring, Assumptions, Validation, Insights/Profiles, and Strategic Use Cases',
                'Scoring Code and Algorithms (Become your IP)',
                'Consulting and Strategy Session'
            ]
        },
        9: {
            id: 9,
            rank: 9,
            name: 'Personalized Product Recommendations',
            gapDesc: 'Prescribing next best product for each customer',
            soYouHeader: 'Keep customers engaged with next best action insights',
            soYouDesc: 'Using customer-centric data, we identify purchase patterns and utilize proprietary tools to rank product recommendations for highly personalized and prescriptive campaigns',
            includes: [
                'Topline Products Diagnostic Bundle, Including Cross-Sell Patterns, Item-Item Association Metrics, Heat Map, and Stickiness Recommendations',
                'Customer-Centric Recommendation Scores Rank-Ordered by Relevance for up to 20 Products/Categories',
                'Presentation Deck Identifying Methodology, Insights, and Use Cases',
                'Consulting and Strategy Session'
            ]
        },
        10: {
            id: 10,
            rank: 10,
            name: 'KPI/Metric Audit & Dashboard Design',
            gapDesc: 'Tracking against business objectives with compelling dashboards',
            soYouHeader: 'Stay on track to meet your business objectives',
            soYouDesc: 'Our experts work with you to evaluate and enhance your existing BI reports and dashboards, ensuring you cleanly track the most actionable KPIs for your business',
            includes: [
                'Full Evaluation of Existing Marketing BI/Reports',
                'Prescriptions and Recommendations for Additional Metrics/Measurement, Benchmarks, and Goals',
                'Executive Dashboard Design (Wireframes, Metadata/Aggregation Design/Code) Built Using Sample Customer Data',
                'Interactive Consulting and Design Session'
            ]
        },
        11: {
            id: 11,
            rank: 11,
            name: 'Analytic Vision & Roadmap',
            gapDesc: 'Following an analytic roadmap aligned with your business vision',
            soYouHeader: 'Put your data to work toward your business goals',
            soYouDesc: 'Our experts collaborate with your team to review your existing analytic solutions and craft an actionable analytic roadmap that informs your strategic efforts and aligns with your growth plan',
            includes: [
                'Topline Review of Existing Analytic Set',
                'Joint Ideation and Planning Sessions for Business Goal and Analytic Alignment',
                'Detailed 3-Year Analytic Roadmap and Implementation Guide'
            ]
        },
        12: {
            id: 12,
            rank: 12,
            name: 'Competitive Evaluation',
            gapDesc: 'Addressing gaps and differentiating your program from the competition',
            soYouHeader: 'Distinguish yourself from the competition',
            soYouDesc: 'By assessing the loyalty landscape and competitors’ offerings, we identify gaps in the market and recommend ways to differentiate your program.',
            includes: [
                'Presentation Deck Identifying Industry Trends and Benchmarks',
                'Competitor Scorecards and Rankings',
                'Scatter Map Indexing Competitive Landscape',
                'Recommendation of Differentiating Program Features'
            ]
        },
        13: {
            id: 13,
            rank: 13,
            name: 'CX/MX Journey Mapping',
            gapDesc: 'Optimizing customer experience flow across all key touchpoints',
            soYouHeader: 'Experience your customers’ journeys',
            soYouDesc: 'Leverage all available data to map and evaluate your customer journey, identifying pain points, recommending strategies for improvement, and generating actionable insights',
            includes: [
                'Collaborative Work Sessions to Map Out Touchpoints and Key Moments',
                'Optimized Customer Journey Map Informed by T.A.R.G.E.T. (Touchpoint And Relationship Gap Evaluation Tool)',
                'Recommendations for Enhancements to Address Gaps and Redundancies'
            ]
        },
        14: {
            id: 14,
            rank: 14,
            name: 'Loyalty Ideation Workshop',
            gapDesc: 'Leveraging an idea bank to actively enhance your CRM/Loyalty program',
            soYouHeader: 'Transform ideas into actionable insights',
            soYouDesc: 'Through an ideation exercise with key stakeholders, we will take the lead in turning abstract ideas into a list of program concepts and immediate enhancements',
            includes: [
                'Categorized Idea Bank',
                'Level of Effort/Impact Matrix',
                'Straw Man Program Concepts',
                'Quick Wins for Program Enhancement'
            ]
        },
        15: {
            id: 15,
            rank: 15,
            name: 'Relationship Analyser',
            gapDesc: 'Identifying how your customers perceive your CRM/Loyalty efforts',
            soYouHeader: 'Discover how customers perceive your relationship',
            soYouDesc: 'Employ a specialized set of research questions to gain a better understanding of customer sentiment toward your marketing efforts, loyalty program, and/or CRM initiatives',
            includes: [
                'Survey of Current Customers Tailored to Business Needs',
                'Index of Survey Results Compared to Competitive Set',
                'Recommendations to Strengthen Customer Relationships',
                'Research Readout and Consulting Session'
            ]
        },
        16: {
            id: 16,
            rank: 16,
            name: 'Loyalty Launch & Planning',
            gapDesc: 'Following a detailed plan for launching a pilot or revised program',
            soYouHeader: 'Get your loyalty program off to a successful start',
            soYouDesc: 'This comprehensive resource outlines a pilot program structure, implementation plan, training plan, and post-launch measurement guide tailored to your specific needs',
            includes: [
                'Launch Roadmap with Milestones for Key Stakeholder Groups',
                'Employee Training Manual',
                'Employee Training Communications Kit',
                'SPIF Recommendations'
            ]
        },
        17: {
            id: 17,
            rank: 17,
            name: 'Strategic Vision & Roadmap',
            gapDesc: 'Detailing a long-term strategic plan and guide to optimize marketing ',
            soYouHeader: 'Keep your program relevant',
            soYouDesc: 'We will develop a dynamic roadmap to guide program evolution and identify themes for short- and long-term program vision, resulting in a detailed 3-year strategic plan',
            includes: [
                'Topline Review of Corporate/Brand Initiatives and Directives',
                'Joint Ideation and Planning Sessions for Program Goals Alignment',
                'Details 3-Year Strategic Roadmap and Implementation Guide'
            ]
        },
        18: {
            id: 18,
            rank: 18,
            name: 'Communications Audit',
            gapDesc: 'Following a plan to address communications gaps and opportunities',
            soYouHeader: 'Find out how your communications stack up',
            soYouDesc: 'Our strategy team will inventory customer communications and analyze engagement metrics to identify weaknesses and recommend improvements',
            includes: [
                'Presentation Deck Identifying Communications Trends and Benchmarking Insights',
                'Member Communications Scorecard',
                'Recommendations for Enhancements to Address Gaps and Redundancies'
            ]
        },
        19: {
            id: 19,
            rank: 19,
            name: 'Emotional Loyalty Measurement',
            gapDesc: 'Tracking your customers’ rational and emotional loyalty to your brand',
            soYouHeader: 'Measure both sides of the equation',
            soYouDesc: 'Identify the depth of your customers’ emotional and rational connections to your brand and loyalty program with our proprietary Brierley Loyalty Quotient',
            includes: [
                'Survey of Current Customers Tailored to Business Needs',
                'Interactive BLQ Dashboard with Rational & Emotional Measures by Brand',
                'Recommendations to Improve Overall BLQ Scores'
            ]
        },
        20: {
            id: 20,
            rank: 20,
            name: 'Loyalty Checkup',
            gapDesc: 'Contextualizing your program against best-in-class standards',
            soYouHeader: 'Give your loyalty program a thorough examination',
            soYouDesc: 'Strategists will score existing program elements against best-in-class core design principles and develop recommendations for near-term wins and immediate program enhancements',
            includes: [
                'Discovery Findings Summary',
                'KPI Scorecard and Benchmarks',
                'Core Design Principles Scorecard',
                'Quick Wins for Program Enhancement'
            ]
        },
        21: {
            id: 21,
            rank: 21,
            name: 'Marketing Jumpstart',
            gapDesc: 'Executing against a progression of quick win marketing campaigns',
            soYouHeader: 'Drive immediate results and learnings',
            soYouDesc: 'Optimize your existing program with a suite of targeted loyalty campaigns designed to deliver tangible insights and complement your program design goals',
            includes: [
                'Marketing Quick Wins Summary',
                'Presentation Deck for Socializing Campaigns to Internal Stakeholders',
                'Campaign Execution Checklist',
                'Post-Campaign Measurement Plan'
            ]
        },
        22: {
            id: 22,
            rank: 22,
            name: 'Next Best Action Marketing Plan',
            gapDesc: 'Following a plan to move each customer to her or his next best action',
            soYouHeader: 'Motivate customers to take the next step',
            soYouDesc: 'Increase customer engagement and grow lifetime value by focusing on a limited, yet impactful, set of behaviors that are mapped to move each customer through a relevant and personalized marketing path',
            includes: [
                'Optimized Set of Desired Behaviors for Customer-Centric Mapping',
                'Personalized Marketing Plan to Motivate Next Best Action',
                'Research Design, Test Plan, and Measurement Scheme'
            ]
        },
    }

    let recs = {
        analysis: [],
        strategy: []
    }

    questions.forEach(d => {
        if (d.response === 'No') {
            recs[d.type].push(recData[d.id])
        }
    })

    return recs
}
export { getScores, getRecommendations }
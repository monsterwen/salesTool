
import { action } from '@storybook/addon-actions';
import ScoreChart from "../../src/components/version2/ScoreChart";

export default {
    title: 'ScoreChart',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};
export const actionsData = {
    onPinTask: action('onPinTask'),
    onArchiveTask: action('onArchiveTask'),
};

export const taskData = {
    id: '1',
    title: 'Test Task',
    state: 'Task_INBOX',
    updated_at: new Date(2019, 0, 1, 9, 0),
};
let moduleData = [
    {
        name: 'Programme Health Assessment'
    },
    {
        name: 'Programme Cost Benefit Analysis'
    },
    {
        name: 'Core Customer Segmentation'
    },
    {
        name: 'Customer Demographic Profiling'
    },
    {
        name: 'Brand & Programme Tracker'
    },
    {
        name: 'Propensity Modelling'
    }
]
const taskTemplate = `
    <div style="height: 500px;width: 600px;">
        <ScoreChart></ScoreChart>
    </div>`;

// default task state
export const Default = () => ({
    components: { ScoreChart },
    template: taskTemplate,
    props: {
        modules: {
            default: () => moduleData,
        },
    },
    methods: actionsData,
});
// pinned task state
export const Pinned = () => ({
    components: { ScoreChart },
    template: taskTemplate,
    props: {
        task: {
            default: () => ({
                ...taskData,
                state: 'TASK_PINNED',
            }),
        },
    },
    methods: actionsData,
});
// archived task state
export const Archived = () => ({
    components: { ScoreChart },
    template: taskTemplate,
    props: {
        task: {
            default: () => ({
                ...taskData,
                state: 'TASK_ARCHIVED',
            }),
        },
    },
    methods: actionsData,
});

import { action } from '@storybook/addon-actions';
import LoadingScreen from "../../src/components/version2/LoadingScreen";

export default {
    title: 'LoadingScreen',
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
        <LoadingScreen></LoadingScreen>
    </div>`;

// default task state
export const Default = () => ({
    components: { LoadingScreen },
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
    components: { LoadingScreen },
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
    components: { LoadingScreen },
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
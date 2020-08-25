
import { action } from '@storybook/addon-actions';
import ResultPageV2 from "../../src/components/version2/ResultPageV2";
export default {
    title: 'ResultPageV2',
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

const taskTemplate = `<div style="width: 1140px;"><ResultPageV2>
</ResultPageV2></div>`;

// default task state
export const Default = () => ({
    components: { ResultPageV2 },
    template: taskTemplate,
    props: {
        task: {
            default: () => taskData,
        },
    },
    methods: actionsData,
});
// pinned task state
export const Pinned = () => ({
    components: { ResultPageV2 },
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
    components: { ResultPageV2 },
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
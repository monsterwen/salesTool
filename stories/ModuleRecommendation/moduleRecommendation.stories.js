
import { action } from '@storybook/addon-actions';
import ModuleRecommendation from "../../src/components/version2/ModuleRecommendation";
export default {
    title: 'ModuleRecommendation',
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

const taskTemplate = `<div style="width: 500px;height: 600px;"><ModuleRecommendation>
</ModuleRecommendation></div>`;

// default task state
export const Default = () => ({
    components: { ModuleRecommendation },
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
    components: { ModuleRecommendation },
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
    components: { ModuleRecommendation },
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

import { action } from '@storybook/addon-actions';
import SignUpField from '../../src/components/SignUpField.vue';
export default {
    title: 'SignUpField',
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

const taskTemplate = `<SignUpField></SignUpField>`;

// default task state
export const Default = () => ({
    components: { SignUpField },
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
    components: { SignUpField },
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
    components: { SignUpField },
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
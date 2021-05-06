// import Vue from 'vue';
import SignUpField from '../src/components/SignUpField.vue';

export default { title: 'Button' };

export const withText = () => '<SignUpField></SignUpField>';

export const withEmoji = () => '<SignUpField></SignUpField>';

export const asAComponent = () => ({
    components: { SignUpField },
    template: '<SignUpField></SignUpField>'
});
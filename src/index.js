import Another from './another';

export default {
    foo() {
        return 'bar';
    },

    anotherFn() {
        return Another.anotherFn() + ', friend';
    },

    mainFn() {
        return 'hello';
    },

    init(config) {
        console.log('[init]', config);
        return Promise.resolve();
    }
};

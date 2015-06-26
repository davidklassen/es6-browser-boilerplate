import Another from './another';

export default {
    foo(arg) {
        console.log(arg);
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

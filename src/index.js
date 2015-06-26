import A from './moduleA.js';
import B from './moduleB.js';

export default {
    init(config) {
        this._config = config;

        return Promise.resolve(); // In case when init() is async
    },
    A: A,
    B: B
};

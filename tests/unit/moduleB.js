import B from '../../src/moduleB.js';

describe('Module B', () => {
    describe('bar() method', () => {
        before(() => {
            sinon.spy(B, 'bar');
        });

        it('should return a string', () => {
            expect(B.bar()).to.be.a('string');
        });

        it('should have been run once', () => {
            expect(B.bar).to.have.been.calledOnce;
        });
    });
});

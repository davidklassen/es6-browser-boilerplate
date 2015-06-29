import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import A from '../../src/moduleA.js';
chai.use(sinonChai);

describe('Module A', () => {
    describe('foo() method', () => {
        before(() => {
            sinon.spy(A, 'foo');
        });

        it('should return a string', () => {
            expect(A.foo()).to.be.a('string');
        });

        it('should have been run once', () => {
            expect(A.foo).to.have.been.calledOnce;
        });
    });
});

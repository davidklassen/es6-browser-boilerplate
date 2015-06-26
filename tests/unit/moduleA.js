import chai from 'chai';
import sinon from 'sinon';
import A from '../../src/moduleA.js';

const expect = chai.expect;
chai.use(require('sinon-chai'));

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

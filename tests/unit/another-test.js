import chai from 'chai';
import sinon from 'sinon';
import Another from '../../src/another';

const expect = chai.expect;
chai.use(require('sinon-chai'));

describe('A second file of tests', () => {
    before(() => {
        sinon.spy(Another, 'anotherFn');
        Another.anotherFn();
    });

    it('should have been run once', () => {
        expect(Another.anotherFn).to.have.been.calledOnce;
    });

    it('should have always returned ok', () => {
        expect(Another.anotherFn).to.have.always.returned('ok');
    });
});

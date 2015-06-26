import chai from 'chai';
import sdk from '../../src';

const expect = chai.expect;

describe('SDK', () => {
    it('should have foo() method', () => {
        expect(sdk.foo).to.be.a('function');
        expect(sdk.foo()).to.not.throw;
    });

    it('should have anotherFn() method', () => {
        expect(sdk.anotherFn).to.be.a('function');
        expect(sdk.anotherFn()).to.not.throw;
    });

    it('should have mainFn() method', () => {
        expect(sdk.mainFn).to.be.a('function');
        expect(sdk.mainFn()).to.not.throw;
    });

    it('should have init() method', () => {
        expect(sdk.init).to.be.a('function');
        expect(sdk.init()).to.not.throw;
    });
});

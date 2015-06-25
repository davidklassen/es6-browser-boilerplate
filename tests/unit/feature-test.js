import chai from 'chai';
import sinon from 'sinon';
import MyLibrary from '../../src/index';

const expect = chai.expect;
chai.use(require('sinon-chai'));

describe('A feature test', () => {
    describe('one function', () => {
        before(() => {
            sinon.spy(MyLibrary, 'mainFn');
            MyLibrary.mainFn();
        });

        it('should have been run once', () => {
            expect(MyLibrary.mainFn).to.have.been.calledOnce;
        });

        it('should have always returned hello', () => {
            expect(MyLibrary.mainFn).to.have.always.returned('hello');
        });
    });

    describe('another function', () => {
        before(() => {
            sinon.spy(MyLibrary, 'anotherFn');
            MyLibrary.anotherFn();
        });

        it('should have been run once', () => {
            expect(MyLibrary.anotherFn).to.have.been.calledOnce;
        });

        it('should have always returned "ok, friend"', () => {
            expect(MyLibrary.anotherFn).to.have.always.returned('ok, friend');
        });
    });
});

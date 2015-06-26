import chai from 'chai';
const expect = chai.expect;

describe('Global reference to SDK', () => {
    it('should be defined', () => {
        expect(MAIN).to.not.be.undefined;
    });

    it('should have a foo method', () => {
        expect(MAIN.foo).to.be.a('function');
    });
});

describe('MAIN', () => {
    describe('foo() method', () => {
        it('should return "bar"', () => {
            expect(MAIN.foo()).to.equal('bar');
        });
    });
});

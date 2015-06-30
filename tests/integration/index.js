describe('Global reference to SDK', () => {
    it('should be defined', () => {
        expect(MAIN).to.not.be.undefined;
    });
});

describe('MAIN', () => {
    describe('A module', () => {
        describe('foo() method', () => {
            it('should return a string', () => {
                expect(MAIN.A.foo()).to.be.a('string');
            });
        });
    });

    describe('B module', () => {
        describe('bar() method', () => {
            it('should return a string', () => {
                expect(MAIN.B.bar()).to.be.a('string');
            });
        });
    });
});

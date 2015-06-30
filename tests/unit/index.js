import sdk from '../../src';

describe('SDK', () => {
    describe('init(config) method', () => {
        it('should save config to "_config" property', () => {
            let config = { foo: 'bar' };
            sdk.init(config);
            expect(config).to.deep.equal(sdk._config);
        });
    });

    it('should have A module', () => {
        expect(sdk.A).to.not.be.undefined;
    });

    it('should have B module', () => {
        expect(sdk.B).to.not.be.undefined;
    });
});

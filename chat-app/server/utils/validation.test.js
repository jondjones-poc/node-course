const expect = require('expect');

const { isRealString} = require('../utils/validation');

describe('isRealString', () => {
    it('GivenNoData_WhenisRealStringCalled_ThenFalse', () => {
        const result = isRealString();

        expect(result).toBeFalsy();
    });

    it('GivenString_WhenisRealStringCalled_ThenTrue', () => {
        const result = isRealString('string');

        expect(result).toBeTruthy();
    });

    it('GivenStringOnlyWithSpaces_WhenisRealStringCalled_ThenFalse', () => {
        const result = isRealString('     ');

        expect(result).toBeFalsy();
    });
});

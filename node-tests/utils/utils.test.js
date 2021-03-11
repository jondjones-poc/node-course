const utils = require('./utils');
const expect = require('expect');

it('GivenTwoNumbers_WhenAddCalled_ThenCorrectNumberShouldBeCalculated', () => {
    const result = utils.add(1, 1);

    expect(result).toBe(2, `Result should be 2 but was ${result}`);
    expect(typeof result).toBe('number');
});

it('GivenTwoNumbers_WhenAsyncAddCalled_ThenCorrectNumberShouldBeCalculated', (done) => {
    const result = utils.asyncAdd(1, 1, (sum) => {
        expect(sum).toBe(2);
        done();
    });
});

it('GivenANumber_WhenSquaredCalled_ThenCorrectNumberShouldBeCalculated', () => {
    const result = utils.square(5);

    expect(result).toBe(25, `Result should be 25 but was ${result}`);
    expect(typeof result).toBe('number');
});


it('GivenTwoNumbers_WhenAsyncSquareCalled_ThenCorrectNumberShouldBeCalculated', (done) => {
    const result = utils.asyncSquare(5, (sum) => {
        expect(sum).toBe(25);
        done();
    });
});


it('GivenAnObject_WhenComparedForEquality_TestPasses', () => {
    const result = {
        name: 'jon'
    };
    expect(result).toEqual({name: 'jon'});
});

it('GivenArray_WhenCheckingForValidItemInArray_TestPasses', () => {
    const numberArray = [1,2,3];
    expect(numberArray).toContain(3);

    const stringArray = ['jon','steve','andy'];
    expect(stringArray).toContain('steve');
});

it('GivenAValidFullName_WhenSetName_ThenuserUpdatesCorrectly', () => {
    const firstname = 'jon';
    const surname = 'jones'
    const fullname = `${firstname} ${surname}`;

    let user = {
        firstname: '',
        surname: ''
    };
    const result = utils.setName(user, fullname);

    expect(result).toMatchObject({
        firstname: firstname,
        surname: surname
    });
});


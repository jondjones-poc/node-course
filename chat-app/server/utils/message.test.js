const expect = require('expect');

const { generateMessge, generateLocationMessge } = require('../utils/message');

describe('Messages', () => {
    it('GivenANameAndText_WhenGenerateMessge_ThenCorrectDataReturned', () => {
        const email = 'admin';
        const text = 'text';

        const result = generateMessge(email, text);

        expect(result.from).toEqual(email);
        expect(result.text).toEqual(text);
        expect(result.createdAt).toBeDefined();
    });
});

describe('LocationMessages', () => {
    it('GivenANameLatAndLng_WhenGenerateLocationMessge_ThenCorrectDataReturned', () => {
        const name = 'admin';
        const lat = 'lat';
        const lng = 'lng';

        const result = generateLocationMessge(name, lat, lng);

        expect(result.from).toEqual(name);
        expect(result.url).toContain(lat);
        expect(result.url).toContain(lng);    
        expect(result.createdAt).toBeDefined();
    });
});
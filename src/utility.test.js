import * as utility from './utility';
import * as data from '../__test__/testdata.js';

test('style for opened status with NO expected closed date', () => {
    const styleReturned = utility.getStyle(data.openedWithNOExpectedNextClosure());
    const styleExpected = { icon: 'icon-go.svg', color: '#3e98c7' };
    expect(styleReturned).toEqual(styleExpected);
});

test('style for opened status with an expected closed date', () => {
    const styleReturned = utility.getStyle(data.openedWithAnExpectedNextClosure());
    const styleExpected = { icon: 'icon-attention.svg', color: '#f86304' };
    expect(styleReturned).toEqual(styleExpected);
});

test('style for closed status', () => {
    const styleReturned = utility.getStyle(data.closed());
    const styleExpected = { icon: 'icon-stop.svg', color: '#cc0000' };
    expect(styleReturned).toEqual(styleExpected);
});


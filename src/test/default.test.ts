import { Default } from '../typeswitch';

describe('Tests on the Default function', () => {

  it('When a lambda is passed into the Default function another function is returned.', () => {
    
    const defaultResult = Default(() => 1);
    expect(typeof defaultResult.Func).toBe('function');
  });


  it('When a true expression is given to Default, the result of the expression is returned.', () => {
    const testNumber = 1;
    const defaultResult = Default(() => testNumber);
    const result = defaultResult.Func();
    expect(result).toBe(testNumber);
  });
});
import { When } from '../typeswitch';

describe('Tests on the When function', () => {

  it('When a lambda is passed into the when function another function is returned.', () => {
    
    const whenResult = When(x => x === x);
    expect(typeof whenResult).toBe('function');
  });


  it('When a true expression is given to when, true is returned.', () => {
    const testNumber = 1;
    const whenResult = When(x => x === testNumber);
    const result = whenResult(testNumber)
    expect(result).toBe(true);
  });

  it('When a false expression is given to when, false is returned.', () => {
    const testNumber = 1;
    const whenResult = When(x => x !== testNumber);
    const result = whenResult(testNumber)
    expect(result).toBe(false);
  });
});
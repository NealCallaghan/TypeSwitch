import { MyTestClass, OtherTestClass } from './helpers';
import { TypeSwitch, Case, When } from '../typeswitch';

describe('Tests on the TypeSwitch function', () => {

  it('When a value is passed into TypeSwitch a function is returned.', () => {
    
    const typeSwitchResult = TypeSwitch(0);
    expect(typeof typeSwitchResult).toBe('function');
  });

  it('When no cases are passed into TypeSwitch an Error is thrown.', () => {
    
    const myTestClass = new MyTestClass('');
    const result = () => {
      const typeSwitchResult = TypeSwitch(myTestClass)();
    };

    expect(result).toThrowError('TypeSwitch error you must provide a case or default value');
  });

  it('When there are no matching cases passed into TypeSwitch an Error is thrown.', () => {
    
    const myTestClass = new MyTestClass('');
    const result = () => {
      const typeSwitchResult = TypeSwitch(myTestClass)(
        Case(String)
          (s => s),
      );
    }

    expect(result).toThrowError('TypeSwitch error you must provide a case or default value');
  });

  it('When there is a matching case with no when the expected result is returned.', () => {
    
    const expectedResult = 'Result';
    const myTestClass = new MyTestClass(expectedResult);
    
    const actualResult = TypeSwitch(myTestClass)(
        Case(MyTestClass)
          (tc => tc.testProperty),
      );
    
    expect(actualResult).toBe(expectedResult);
  });

  it('When there is a matching case with no when the expected result is expected type.', () => {
    
    const myTestClass = new MyTestClass('');
    
    const actualResult = TypeSwitch(myTestClass)(
        Case(MyTestClass)
          (tc => tc),
      );
    
    expect(actualResult).toBeInstanceOf(MyTestClass);
  });

  it('When there are two matching cases the first is returned.', () => {
    
    const testString = 'match';
    const myTestClass = new MyTestClass(testString);
    
    const actualResult = TypeSwitch(myTestClass)(
        Case(MyTestClass, When(tc => tc.testProperty === testString))
          (_ => 'I Matched'),
        Case(MyTestClass, When(tc => tc.testProperty === testString))
          (_ => 'I did not Match'),
      );
    
    expect(actualResult).toBe('I Matched');
  });

  it('When there there is a matching case with when return the matched value.', () => {
    
    const testString = 'match';
    const myTestClass = new MyTestClass(testString);
    
    const actualResult = TypeSwitch(myTestClass)(
        Case(MyTestClass, When(tc => tc.testProperty !== testString))
          (_ => 'I do not Match'),
        Case(MyTestClass, When(tc => tc.testProperty === testString))
          (_ => 'I Matched'),
      );
    
    expect(actualResult).toBe('I Matched');
  });

  it('When there there is a matching case without when return the matched value.', () => {
    
    const testString = 'match';
    const myTestClass = new MyTestClass(testString);
    
    const actualResult = TypeSwitch(myTestClass)(
        Case(String)
          (_ => 'I do not Match'),
        Case(MyTestClass)
          (_ => 'I Matched'),
      );
    
    expect(actualResult).toBe('I Matched');
  });

  it('When there there is a matching case that is false with when return the matched value.', () => {
    
    const testString = 'match';
    const myTestClass = new MyTestClass(testString);
    
    const actualResult = TypeSwitch(myTestClass)(
        Case(String, When(_ => true))
          (_ => 'I do not Match'),
        Case(MyTestClass)
          (_ => 'I Matched'),
      );
    
    expect(actualResult).toBe('I Matched');
  });

  it('When there there is a matching case that is true with when return the matched value.', () => {
    
    const testString = 'match';
    const myTestClass = new MyTestClass(testString);
    
    const actualResult = TypeSwitch(myTestClass)(
        Case(String)
          (_ => 'I do not Match'),
        Case(MyTestClass, When(_ => true))
          (_ => 'I Matched'),
      );
    
    expect(actualResult).toBe('I Matched');
  });

  it('When two marker classes are used the correct one is chosen with the returned result.', () => {
    
    const testString = 'match';
    const myTestClass = new MyTestClass(testString);
    
    const actualResult = TypeSwitch(myTestClass)(
        Case(OtherTestClass)
          (_ => 'I do not Match'),
        Case(MyTestClass, When(_ => true))
          (_ => 'I Matched'),
      );
    
    expect(actualResult).toBe('I Matched');
  });
});
import { MyTestClass } from './helpers';
import { Case, When } from '../typeswitch';

describe('Tests on the Case function', () => {

  it('When a type is passed into Case another function is returned.', () => {
    
    const caseResult = Case(MyTestClass);
    expect(typeof caseResult).toBe('function');
  });

  it('When a type is passed into Case the case result is an object with func and type properties only.', () => {
    
    const caseResult = Case(MyTestClass)(t => t);
    
    expect(typeof caseResult.Func).toBe('function');
    expect(caseResult.Type).toBe(MyTestClass);
    expect(caseResult.When).toBeUndefined();
  });

  it('When a type is passed into Case with a When the case result is an object with func, type and when.', () => {
    
    const caseResult = Case(MyTestClass, When(t => true))(t => t);
    
    expect(typeof caseResult.Func).toBe('function');
    expect(caseResult.Type).toBe(MyTestClass);
    expect(typeof caseResult.When).toBe('function');
  });

  it('When a when function is passed into Case that has an expression that is true, true is returned from it.', () => {
    
    const caseResult = Case(MyTestClass, When(t => true))(t => t);
    
      const result = caseResult.When!(new MyTestClass(''));  
      expect(result).toBe(true);
  });

  it('When a when function is passed into Case that has an expression that is false, false is returned from it.', () => {
    
    const caseResult = Case(MyTestClass, When(t => false))(t => t);
    
      const result = caseResult.When!(new MyTestClass(''));  
      expect(result).toBe(false);
  });

  it('When the body function of the Case is invoked the result is expected.', () => {
    
    const returned = 1;
    const caseResult = Case(MyTestClass)(t => t);
    
      const result = caseResult.Func(returned);
      expect(result).toBe(returned);
  });
});


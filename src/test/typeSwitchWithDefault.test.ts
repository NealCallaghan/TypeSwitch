import { MyTestClass, OtherTestClass } from './helpers';
import { TypeSwitchWithDefault, Default, Case } from '../typeswitch';

describe('Tests on the TypeSwitchWithDefault function', () => {

  it('When used without a default a function is returned.', () => {
    
    const actualResult = TypeSwitchWithDefault(0)(
        Case(OtherTestClass)
          (_ => 'I do not Match'),
        Case(MyTestClass)
          (_ => 'I do not Match either'),
      );
    
    expect(typeof actualResult).toBe('function');
  });
  it('When two marker classes are used and neither matches then the default result is returned.', () => {
    
    const actualResult = TypeSwitchWithDefault(0)(
        Case(OtherTestClass)
          (_ => 'I do not Match'),
        Case(MyTestClass)
          (_ => 'I do not Match either'),
      )(
        Default(() => 'I Matched')
      )
    
    expect(actualResult).toBe('I Matched');
  });
});
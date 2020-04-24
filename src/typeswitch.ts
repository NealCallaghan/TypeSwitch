type TypeConstructor = new (...args: any[]) => any;

type WhenResult<T> = (arg: T) => boolean;
export const When = <T>(func: (arg: T) => boolean):WhenResult<T> => (arg: T) => func(arg);

export interface CaseResult {
  Type: TypeConstructor,
  Func: (arg: InstanceType<TypeConstructor>) => any,
  When?: WhenResult<InstanceType<TypeConstructor>>,
}

type CaseFunc = <T extends TypeConstructor>(type: T, whenFunc?: WhenResult<InstanceType<T>>) => (func: (arg: InstanceType<T>) => any) => CaseResult;

export const Case:CaseFunc = <TOut>(type: TypeConstructor, whenFunc?: WhenResult<InstanceType<TypeConstructor>>) => (func: (arg: InstanceType<TypeConstructor>) => TOut) => {
  const caseResult:CaseResult = {
    Type: type,
    Func: (a: InstanceType<TypeConstructor>) => func(a),
    When: whenFunc,
  }
  return caseResult;
};

export interface DefaultResult {
  Func: () => any,
}

type DefaultFunc = (func: () => any) => DefaultResult;

export const Default: DefaultFunc = (func: () => any): DefaultResult => {
  const result: DefaultResult = {
    Func: func,
  }
  return result;
};

const findMatchingCaseResult = (arg: any, caseResult: CaseResult): boolean => {
  
  const matchingConstructors = caseResult.Type.name === arg.constructor.name;
  if (!caseResult.When) return matchingConstructors;

  return matchingConstructors && caseResult.When(arg);
};

export const TypeSwitchWithDefault = (arg: any) => (...funcs: CaseResult[]) => (def?: DefaultResult) => {

  const func = funcs.find(t => findMatchingCaseResult(arg, t)) || def;
  if (!func) {
      throw Error('TypeSwitch error you must provide a case or default value');
  }
  
  return func.Func(arg);      
};

export const TypeSwitch = (arg: any) => (...funcs: CaseResult[]) => TypeSwitchWithDefault(arg)(...funcs)();
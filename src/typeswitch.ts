export type TypeConstructor = new (...args: any[]) => any

export interface HasConstructor {
  constructor: { name: string }
}

export interface CaseResult {
  Type: TypeConstructor,
  Func: (arg: InstanceType<TypeConstructor>) => any
}

export interface DefaultResult {
  Func: () => any
}

export type CaseFunc = <T extends TypeConstructor>(type: T) => (func: (arg: InstanceType<T>) => any) => CaseResult

export const Case:CaseFunc = <TOut>(type: TypeConstructor) => (func: (arg: InstanceType<TypeConstructor>) => TOut) => {
  const caseResult:CaseResult = {
    Type: type,
    Func: (a: InstanceType<TypeConstructor>) => func(a),
  }
  return caseResult;
}

export type DefaultFunc = (func: () => any) => DefaultResult

export const Default: DefaultFunc = (func: () => any): DefaultResult => {
  const result: DefaultResult = {
    Func: func,
  }
  return result;
}

export const TypeSwitchWithDefault = (arg: any) => (...funcs: CaseResult[]) => (def?: DefaultResult) => {

    const func = funcs.find(t => t.Type.name === arg.constructor.name) || def;
    if (!func) {
        throw Error('you must provide a case or default value');
    }
    
    return func.Func(arg);      
}

export const TypeSwitch = (arg: any) => (...funcs: CaseResult[]) => TypeSwitchWithDefault(arg)(...funcs)();

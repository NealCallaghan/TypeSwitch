# TypeSwitch
Provides a TypeSwitch function in Typescript allowing you to switch on the type of the argument past into the function providing a sudo simple pattern matching function

The `Case` function used within the `TypeSwitch` is type safe, so you can't use a `String` and then provide a function that uses a number as it's argument. 

The `TypeSwitch` function can be used like this:

```
class MyOwnMarkerClass {
  public someProperty: string = "some property value"
}

const result = TypeSwitch(new MyOwnMarkerClass())(
    Case(Number)
      ((n: number) => `you gave me a number and it was ${n.toString()}`),
    Case(String)
      ((s: string) => `you gave me a string ${s}`),
    Case(MyOwnClass)
      ((m: MyOwnClass) => `you gave me MyOwnClass with value ${m.someProperty}`)
);
```

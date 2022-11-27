type Zero= {
    isZero: true 
}

type Succ <T extends Num> ={
    pre: T 
    isZero: false 
}

type Num  = Zero | {pre: Num , isZero: false}

type Pre<T extends Num> = T extends Succ<infer P> ? P:Zero 

type Equal<A, B> = [A] extends [B] ? [B] extends [A] ? true: false : false 

type Equal1<A, B> = A extends B ? B  extends A ? true: false: false 


type TestNever = Equal1<never, never>
type TestNever1 = Equal<never, never>

type _4 = FromNumber<4> 
type _5 = FromNumber<5>
type _6 = FromNumber<6>

type If<Cond, A, B> = Equal<Cond , true> extends true ? A: B 
type ToBoolean<A> = If<A, true, false> 
type And<A, B> = If<A, ToBoolean<B>, false> 
type Or<A, B>  = If<A, true ,ToBoolean<B>>
type IsZero<T extends Num> = Equal<T , Zero> 
type IsNever<T> = Equal<T,never> 


interface Table {
    0: Zero 
    1: Succ<this[0]> 
    2: Succ<this[1]> 
    3: Succ<this[2]> 
    4: Succ<this[3]> 
    5: Succ<this[4]>
    6: Succ<this[5]>
    7: Succ<this[6]>
    8: Succ<this[7]>
    9: Succ<this[8]>
}

type FromNumber<T extends number> = (Table & {[K: number ]:never})[T]

type Add<A extends Num, B extends Num> = {
    "A is Zero": B 
    "B is Zero": A 
    "No Zero": Succ<Add<Pre<A>, B>>
}[If<IsZero<A>, "A is Zero", If<IsZero<B>, "B is Zero", "No Zero">>]


type _7 = Add<FromNumber<3>, FromNumber<4>>

type Sub<A extends Num, B extends Num> = {
    "B is Zero":A 
    "A is Zero": never 
    "No Zero": Sub<Pre<A>, Pre<B>>
}[If<IsZero<B>, "B is Zero", If<IsZero<B>, "A is Zero", "No Zero">>]


type Mult<A extends Num, B extends Num> = MultHelper<A, B, Zero>

type MultHelper<A extends Num, B extends Num, R extends Num> = {
    "Has Zero": R
    "No Zero": MultHelper<Pre<A>, B, Add<B, R>> // '"No Zero"' is referenced directly or indirectly in its own type annotation.
}[If<Or<IsZero<A>, IsZero<B>>, "Has Zero", "No Zero">]

type _81=  Mult<FromNumber<9>, FromNumber<9>>

type Manufacture = 'Apple' | 'Google' | 'Samsung' | 'Sony';
type Manufactures = Manufacture[];

type ShowMeTheType = Manufactures[number];



type FlattenManufacture = Flatten<Manufacture>; // "Apple" | "Google" | "Samsung" | "Sony"
type FlattenManufactures = Flatten<Manufacture[]>; // "Apple" | "Google" | "Samsung" | "Sony"


type Flatten<T> = T extends any[] ? true : false;
type Example1 = Flatten<['a', true, 3]>; // true | 3 | "a"
type Example2 = Flatten<string[]>; // string
type Example3 = Flatten<'not array'>; // "not array"


type StringArray = string[];
type StringArrayElement = StringArray[number];
type NumberArray = number[];
type NumberArrayElement = NumberArray[number]


type SomeArray = [string, number, boolean]
type Element0  =SomeArray[0]
type Element1 = SomeArray[1]
type Element2 = SomeArray[2]
type Elements = SomeArray[number] 

type T1 = Extract<'a' | 'b' | 'c', 'a'>
type T2 = Extract<'a' | 'b' | 'c', 'a' | 'b'>
type T3 = Extract<string | number | (()=> void), Function>;
type T4 = Extract<'a' | 'b' | 'c', 'a'| 'f'>;

type T21 = Exclude<'a' | 'b' | 'c', 'a'>;
type T22 = Exclude<'a' | 'b' | 'c', 'a'>
type T23 = Exclude<string | number | (()=> void), Function> 
type T24 = Exclude<'a' | 'b' | 'c', 'a' | 'z'> 

type NonNullable1<T> = T extends null | undefined ? never : T;


type NoDistributeExtract<T, U> = [T] extends [U]?T: never;
type NoDistributeExtractReturn1 = NoDistributeExtract<'a' | 'b', 'a' | 'b' | 'c'>; 


type T31  = ReturnType<()=> string>;
type T32  = ReturnType<(s:string)=> number[]>

type T41 = Parameters<(a: number, b:string) => number >;
type T42 = Parameters<(a: number[])=> number >;
type T43 = Parameters<(a: {firstName:string; lastName: string}) => string>;
type T44 =Parameters<(...a: number[])=> number>;


type Flatten1<T> = T extends any[] ? T[number]:T 
type Flatten2<T> = T extends (infer R)[] ? R:T 

type T61 = Flatten1<number[]>
type T62 = Flatten1<(string | number)[]>
type T63 = Flatten1<number>

type InferResp<T> = T extends {response : infer R; status: number} ? R: T;
type T64 = InferResp<{response:{data: "foobar"}; status: 200}>
type T65 = InferResp<{status: 4000}>

type HelloWorld = string

type MyPick<T,K extends keyof T> {
    [Key in K]: T[Key]
}

type MyReadonly<T> = {
    readonly [Key in keyof T]:T[Key]
}

type TupleToObject<T extends readonly (string|number)[] > = {
    [Key in T[number]]: Key
}

type  First<T extends any[]> = T extends [] ? never: T[0]

type Length <T extends readonly unknown[]>= T['length']

type MyExclude<T,U> = T extends U ? never: T

type MyAwaited<T> = T extends PromiseLike<infer U>? MyAwaited<U>:T ;
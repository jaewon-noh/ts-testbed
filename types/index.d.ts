interface Foo {
	propA: boolean;
	propB: boolean;
}


declare function ff<T extends boolean>(x: T): T extends true ? string : number;

declare function f<T>(x: T): T extends Foo ? string : number;

declare function foo(x: string): number;
declare function foo(x: number): string;
declare function foo(x: string | number): string | number;

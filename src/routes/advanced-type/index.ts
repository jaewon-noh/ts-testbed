import {App} from '@tinyhttp/app';

export const app = new App();



app
	.get('/', (req, res) => {
		// type guard
		abstract class Person {
			abstract study(): boolean;
		}

		class JW extends Person {
			study(): boolean {
				return true;
			}
			pet(): boolean {
				return true;
			}
		}

		class YD extends Person {
			study(): boolean {
				return false;
			}
			game(): boolean {
				return true;
			}
		}

		const personGenerator = () => Math.random() > 0.5 ? new JW() : new YD();
		const person = personGenerator();

		if ('study' in person) { // 가능
			console.info(person.study());
		}

		// if (person.game) { // 타입 추론이 안 된 상태에서 property 확인 불가능
		// 	console.info(person.study());
		// } else if (person.pet) {
		// 	console.info(person.study());
		// }

		// const jwAssertion = person as JW;
		// const ydAssertion = person as YD;

		// if (ydAssertion.game) { // 타입 추론이 가능해진다.. 근데 항상 true라고 필요없는 코드라 하네..
		// 	console.info(person.study());
		// } else if (jwAssertion.pet) {
		// 	console.info(person.study());
		// }

		const isYd = (person: YD | JW): person is YD => { // *** is type 의 형태는 boolean을 의미하게 된다. return값이 boolean이어야 한다
			return !!((person as YD).game)
		};

		if (isYd(person)) {
			person.game();
		} else {
			person.pet();
		}
		// const pppp: YD[] = [new YD(), new YD(),new YD(),new YD(),];
		const personArr: (YD | JW)[] = [personGenerator(), personGenerator(), personGenerator(), personGenerator()];
		const filteredArr = personArr.filter((person) => isYd(person));
		const filteredArr1 = personArr.filter<YD>(isYd);
		// const filteredArr2 = pppp.filter<YD>((person) => isYd(person));

		// typeof guard

		const test = (param: string | number) => {
			// typeof target === 'string' or typeof target !== 'string' 이 두 구문은 Typescript의 transpile과정에 유효하게 쓰이는 듯.
			// 다만 typeof 로 확인할 수 있는 값이어야 한다. 기본 타입들에 해당 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
			if (typeof param === 'string') {
				console.info(param);
			}
			if (typeof param === 'number') {
				console.info(param);
			}
		};

		const test2 = (param: YD | JW) => {
			if (param instanceof YD) { // typeof와 마찬가지 맥락
				console.info(param);
			}
			if (param instanceof JW) {
				console.info(param);
			}
		}
		// nullable types
		let nullableTest: number | null | undefined = 1;
		console.info(nullableTest);
		nullableTest = null;
		console.info(nullableTest);
		nullableTest = undefined;
		console.info(nullableTest);

		const test3 = (param?: number) => { // optional로 둘 경우 number | undefined의 union type으로 선언되는 것을 확인
			console.info(param);
		}

		// test3(null);
		test3(undefined); // 직접 할당도 가능
		test3(); // 안 넣는 것도 가능
		test3(1);

		const test4 = (param: string): string | undefined => {
			return 'ss';
		};

		const aa = test4('st');
		// aa.trim(); // undefined일 수 있다고 경고 null로 설정해도 null일 수 있다고 경고 뜸.
		aa!.trim(); // 타입을 체크하려고 ts를 쓰는데.. 이 기능은 코드상에서 자주 보이면 안될듯.

		// type alias는 예제 진행하면서 많이 사용 해봐가지고... skip.. 제네릭, 유니언, 인터섹션 전부 사용 가능하며 기본 타입과 1:1 매칭은 비효율, 비추천.

		// type alias와 interface의 비교

		// 둘 다 가능한 점

		interface human {
			age: number
		}

		interface yd extends human {
			game: boolean
		}

		type human1 = { age: number };

		type yd1 = human1 & { game: boolean };

		// 서로 다른 점

		interface robot {
			power: bigint
		}

		interface robot { // 새 필드 추가 가능
			skin: boolean
		}

		type robot1 = { power: bigint };
		// type robot1 = { skin: boolean }; // 중복 정의 오류

		// 문서에서는 객체의 형태라면 interface 그렇지 않다면 type alias를 추천하고 있다.

		// enum TestEnum { // 모든 멤버가 리터럴일 때 타입을 가진다고 한다. 일단 numeric 리터럴이 아닌 다른 타입을 집어 넣는 것 자체를 막힌게 기본 설정인
		// 	yd = 1,
		// 	jw = 2,
		// }

		// Polymorphic this types
		class Hobby {
			title: string;
			value: string = '';
			constructor(title: string) {
				this.title = title;
			}
			do(person: string): this {
				this.value += `${person}가 ${this.title}(이)라는 취미 생활을 한다.`;
				return this;
			}
			end() {
				this.value += `하지만 종료했다.`;
				return this.value;
			}
		}

		class Game extends Hobby {
			constructor(title: string) {
				super(title);
			}
			game(title: string) {
				this.value += `타이틀은 ${title}이다.`;
				return this;
			}
		}

		const gameInstance = new Game('게임');
		const v = gameInstance.do('yd').game('슈퍼마리오').end(); // do에서 return type이 this가 아니어도 작동하는 부분. 아직 잘 모르겠음.
		console.info(v);

		// K extends keyof T 형태를 index type이라고 하는 모양.

		interface Dictionary<T> {
			[key: number]: T;
		}

		type keys = keyof Dictionary<number>;

		type numberValue = Dictionary<number>[42];

		// type value = Dictionary<number>["foo"]; // key가 number type으로 지정 되어서 string인 key로 찾을 수 없다.

		interface obj {
			name: string,
		}

		type testobj = Pick<obj, 'name'>;
		type ThreeStringProps = Record<"prop1" | "prop2" | "prop3", string>;

		const a: testobj = {
			name: 'yd'
		};

		const b: ThreeStringProps = {
			prop1: 'yd',
			prop2: 'yd',
			prop3: 'yd',
			// prop4: 'jw'
		};

		interface Person2 {
			name: string;
			age: number;
		}
// ---cut---
		type PersonPartial = Partial<Person2>;
//   ^?
		type ReadonlyPerson = Readonly<Person2>;

		type NullablePerson = { [P in keyof Person2]: Person2[P] | null };

		type PartialPerson = { [P in keyof Person2]?: Person2[P] };

// 		type Proxy<T> = {
// 			get(): T;
// 			set(value: T): void;
// 		};
//
// 		type Proxify<T> = {
// 			[P in keyof T]: Proxy<T[P]>;
// 		};
//
// 		function proxify<T>(o: T): Proxify<T> {
// 			return {} as any;
// 		}
//
// 		let props = { rooms: 4 };
// 		let proxyProps = proxify(props);
// // ---cut---
// 		function unproxify<T>(t: Proxify<T>): T {
// 			let result = {} as T;
// 			for (const k in t) {
// 				result[k] = t[k].get();
// 			}
// 			return result;
// 		}
//
// 		let originalProps = unproxify(proxyProps);
//
// 		console.info(originalProps);

		function ff(x: boolean) {
			if (x) {
				return 'true라는';
			} else {
				return 'false라는';
			}
		}

		let x = ff(Math.random() < 0.5);
		console.info(x);

		type TypeName<T> = T extends string
			? "string"
			: T extends number
			? "number"
			: T extends boolean
			? "boolean"
			: T extends undefined
			? "undefined"
			: T extends Function
			? "function"
			: "object";

		type T0 = TypeName<string>;

		type T1 = TypeName<"a">;

		type T2 = TypeName<true>;

		type T3 = TypeName<() => void>;

		type T4 = TypeName<string[]>;

		function isFoo(x: any): x is Foo {
			if (typeof x === 'object') {
				return x.propA;
			} else {
				return false;
			}
		}

		function f<T>(x: T) {
			if (isFoo(x)) {
				return 'foo 라는';
			} else {
				return 1;
			}
		}

		// function foo<U>(x: U) {
		// 	// Has type 'U extends Foo ? string : number'
		// 	// This assignment is allowed though!
		// 	let b: string | number = f(x);
		// 	console.info(b);
		// }
		//
		// const aaa: Foo = { propA: true, propB: true};
		// foo(aaa);
		// foo(1);

		// 분산 조건부 Distributive conditional types

		type T5 = TypeName<string | (() => void)>;

		type T6 = TypeName<string | string[] | null>; // null인데 'function' 이 찍힌다..????

		type T7 = TypeName<string[] | number[]>;

		type BoxedValue<T> = { value: T };
		type BoxedArray<T> = { array: T[] };
		type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

		type T8 = Boxed<string>;
		type T9 = Boxed<number[]>;
		type T10 = Boxed<string | number[]>;

		type Diff<T, U> = T extends U ? never : T;
		type Filter<T, U> = T extends U ? T : never;

		type T11 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;
		type T12 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;
		type T13 = Diff<string | number | (() => void), Function>;
		type T14 = Filter<string | number | (() => void), Function>;

		type NotNullable<T> = Diff<T, null | undefined>;
		type T15 = NotNullable<string | number | undefined>;
		type T16 = NotNullable<string | string[] | null | undefined>;

		// function f1<T>(x: T, y: NotNullable<T>) {
		// 	x = y;
		// 	y = x;
		// }
		//
		// function f2<T extends string | undefined>(x: T, y: NotNullable<T>) {
		// 	x = y;
		// 	y = x;
		// 	let s1: string = x;
		// 	let s2: string = y;
		// }

		type FunctionPropertyNames<T> = {
			[K in keyof T]: T[K] extends Function ? K : never;
		}[keyof T];
		type NonFunctionPropertyNames<T> = {
			[K in keyof T]: T[K] extends Function ? never : K;
		}[keyof T];
		type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
		type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

		interface Part {
			id: number;
			name: string;
			subparts: Part[];
			updatePart(newName: string): void;
			updatePart2(newName: string): void;
		}

		type T17 = FunctionPropertyNames<Part>;
		type T18 = NonFunctionPropertyNames<Part>;
		type T19 = FunctionProperties<Part>;
		type T20 = NonFunctionProperties<Part>;

		type ElementType<T> = T extends any[] ? ElementType<T[number]> : T; // ? 에러라는데 된다. 설정의 차이인가..

		type Unpacked<T> = T extends (infer U)[]
			? U
			: T extends (...args: any[]) => infer U
			? U
			: T extends Promise<infer U>
			? U
			: T;

		type T21 = Unpacked<string>;
		type T22 = Unpacked<string[]>;
		type T23 = Unpacked<() => string>;
		type T24 = Unpacked<Promise<string>>;
		type T25 = Unpacked<Promise<string>[]>;
		type T26 = Unpacked<Unpacked<Promise<string>[]>>;

		type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

		type T27 = Foo<{ a: string; b: string }>;
		type T28 = Foo<{ a: string; b: number }>;
		type T281 = Foo<{ aa: string; bb: number }>;

		type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer K) => void }
			? U & K
			: never;

		type T29 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;
		type T30 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;

		type T31 = ReturnType<typeof foo>;


		res.json({
			advancedType: true,
		});
	})
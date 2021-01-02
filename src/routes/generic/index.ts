import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		// echo 함수를 만들어 본다.
		function echo(param: number): number {
			return param;
		}

		function echo1(param: any): any { // 여러 타입을 받을 수 있지만 엔진 입장에서 명확한 추론이 되지는 않는 모양.
			return param;
		}

		function echo2<T>(param: T): T { // echo2함수에 T라는 타입의 제네릭을 추가함으로 인해 명확하게 타입 추론이 가능케 한다.
			return param;
		}

		// function echo3<T>(param: T): T {
		// 	console.info(param.length); // 어디에도 type T가 length를 가졌다는 단서가 없다. 모든 타입에서 사용할 수 있는 멤버 변수나 함수가 아니라면 섣불리 사용할 수 없다.
		// 	return param;
		// }

		function echo3<T>(param: T[]): T[] {
		// function echo3<T>(param: Array<T>): Array<T> { // 동일한 의미
			console.info(param.length); // type T를 item으로 가지는 배열이 매개변수로 들어오고 있다. length를 가졌다는 추론이 가능해진다.
			return param;
		}

		// type echo = <T>(param: T) => T;
		type echo = <YD>(param: YD) => YD; // 같은 형식에 대해서 T이외의 다른 이름을 사용하여도 문제 없다. 다만 T는 type을 의미하는 약속인듯
		// type echo = { <T>(param: T): T }; // function type을 object lieteral의 형태로도 작성 가능하다. function type을 interface로 작성하는 것과 이어진다.

		const copyEcho2: echo = echo2;

		interface echo1 {
			<T>(param: T[]): T[]
		}

		interface echo2<T> { // echo1 과 같은 코드, 인터페이스의 모든 멤버가 <T>를 참조 할 수 있게 된다.
			(param: T[]): T[]
		}

		const copyEcho3: echo1 = echo3;
		const copyEcho4: echo2<number> = echo3;

		class echoClass<T> {
			memberVar: T;
			constructor(init: T) {
				this.memberVar = init;
			}
			test(param: T): T {
				return param;
			}
		}

		const echoClassInstance = new echoClass<string>('yd');

		// 클래스에 타입을 지정 하더라도 static멤버는 해당 타입을 사용할 수 없다.

		interface Lengthwise {
			length: number;
		}

		function echo4<T extends Lengthwise>(param: T): T {
			console.info(param.length);
			return param;
		}

		function echo5<T, K extends keyof T>(obj: T, key: K) {
			return obj[key];
		}

		type Constructor<T> = new () => T ; // { new (): T }는 잘 되는데 interface로 하면 뭔가 잘 안됨....

		function factory<T>(c: Constructor<T>): T {
			return new c();
		}

		class a {}
		class b {}
		class c {}

		abstract class AA {
			member: string;
			protected constructor() {
				this.member = 'YD';
			}
			abstract getMember(): string
		}

		function factory1<T extends AA>(c: new () => T): T {
			return new c();
		}

		class d extends AA {
			constructor() {
				super();
			}
			getMember(): string {
				return this.member;
			}
		}

		class e {}


		res.json({
			generic: true,
			test: echo(1),
			test1: echo1('jw'),
			test2: echo2<boolean>(true), // echo2의 T를 boolean으로 명시 해준다.
			// test2: echo2(true), // 이렇게 생략도 가능하다.
			test3: echo3<number>([1,2,3,4,5,6]),
			test4: copyEcho2<string>('yd'),
			test5: copyEcho3<string>(['jw', 'yd']),
			test6: copyEcho4([1,2,3]), // copyEcho4<number>([1,2,3]) 이렇게는 오류가 난다. 이미 제네릭 인터페이스에 타입을 지정했기 때문
			test7: `${echoClassInstance.memberVar} and ${echoClassInstance.test('JW')}`,
			test8: echo4<string>('YD'), // length 속성을 가진 type 사용이 가능하다.
			test9: echo5({a: 1, b:2, c: 3}, 'c'), // echo5({a: 1, b:2, c: 3}, 'd') d가 object의 key가 아니기 때문에 에러
			test10: factory(a),
			test11: factory(b),
			test12: factory(c),
			test13: factory1(d),
			// test14: factory1(e), // 타입에 맞지 않는 (이 경우엔 추상 클래스 AA를 구현한 클래스가 아닌 경우) 클래스인 경우 에러.
		});
	})
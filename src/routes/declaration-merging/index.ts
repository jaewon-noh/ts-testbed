import { App } from '@tinyhttp/app';
import { C } from './namespace';

export const app = new App();

app
	.get('/', (req, res) => {
		// 선언 병합
		// namespace: namespace: true, type: false, value: true
		// class: namespace: false, type: true, value: true
		// enum: namespace: false, type: true, value: true
		// interface: namespace: false, type: true, value: false
		// type: namespace: false, type: true, value: false
		// function: namespace: false, type: false, value: true
		// variable: namespace: false, type: false, value: true

		// merging interface
		interface YD {
			name: string
			age: number
		}

		interface YD {
			game: boolean
			study: boolean
		}

		const yd: YD = {
			name: 'yd',
			age: 24,
			game: true,
			study: false,
		}

		console.info(yd);

		// 함수가 아닌 멤버는 유니크해야 하지만 함수 멤버는 overload처리된다.

		interface A {
			foo(param: string): number
		}

		interface A {
			foo(param: boolean): undefined
		}

		interface A {
			foo(param: number): null
		}

		// 다음과 동일하다.
		// interface A {
		// 	foo(param: string): number
		// 	foo(param: boolean): undefined
		// 	foo(param: number): null
		// }

		const a: A = {
			foo(param: string | boolean | number): any {
				if (typeof param === 'string') {
					return 1;
				}

				if (typeof param === 'boolean') {
					return undefined;
				}

				return null;
			}
		};

		console.info(a.foo('s'));
		console.info(a.foo(true));
		console.info(a.foo(1));

		// 함수의 파라미터가 특정 signature를 가졌을 때에는 예외적으로 버블링 된다.

		interface B {
			bar(param: string): string
		}

		interface B {
			bar(param: 'test'): number
		}

		interface B {
			bar(param: 'abc'): boolean
		}

		// 다음과 동일하다.
		// interface B {
		// 	bar(param: 'test'): number
		// 	bar(param: 'abc'): boolean
		// 	bar(param: string): string
		// }

		// namespace 병합
		console.info(C.YD);
		console.info(C.JW);
		console.info(C.jw);
		console.info(C.getName());
		console.info(C.getYdName());
		// namespace쪽으로 넘어가서 설명
		// 다시 돌아와서.. class와 class는 병합되지 않는다. class와 변수도 병합되지 않는다.

		// export class Observable<T> {
		// 	// ... implementation left as an exercise for the reader ...
		// }


// 		import { Observable } from "./observable";
// 		declare module "./observable" { // 모듈의 확장에 대한 선언을 함으로써 transpiler에게 map의 존재를 알려주게 된다.
// 			interface Observable<T> {
// 				map<U>(f: (x: T) => U): Observable<U>;
// 			}
// 		}
		// Observable.prototype.map = function (f) { // 기본적으로 ts에서도 문제없이 작동하는 부분이지만 transpiler가 알지 못한다.
		// 	// ... another exercise for the reader
		// };


		// mixin 이어서..

		// 기본이 되는 class를 정의한다.

		class YD {
			name: string = 'yd';
			age: number = 24;
		}

		type Constructor = new (...args: any[]) => {};

		// class를 확장할 수 있는 팩토리를 마련한다.

		function mixin<Origin extends Constructor>(OriginClass: Origin) {
			return class Gamer extends OriginClass {
				name: string = 'yd kim';
				game: boolean = true;
				tier() {
					return 'bronze';
				}
			}
		}

		const GamerYD = mixin(YD);
		const GamerYDI = new GamerYD();
		console.info(GamerYDI.name);
		console.info(GamerYDI.age);
		console.info(GamerYDI.tier());

		// 제한적인 믹스인
		// 타입에 특정한 signature를 두고 mixin대상을 제한한다.
		type GConstructor<T = {}> = new (...args: any[]) => T;
		type TStudentYd = GConstructor<{ study: boolean, ts: () => boolean }>;
		class SYD {
			study: boolean = false;
			ts() {
				return true;
			}
		}
		function mixin2<Origin extends TStudentYd>(OriginClass: Origin) {
			return class Student extends OriginClass {
				js() {
					return this.ts();
				}
			}
		}

		const StudentYD = mixin2(SYD);
		const StudentYDI = new StudentYD();
		console.info(StudentYDI.js());

		// 다음과 같은 형태로의 대안도 가능하다.

		// applyMixins(Base, [A, B]);


		function applyMixins(derivedCtor: any, constructors: any[]) {
			constructors.forEach((baseCtor) => {
				Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => { // 클래스의 프로퍼티들을 순회
					Object.defineProperty( // 프로퍼티를 Base에 생성하는 형태로 확장.
						derivedCtor.prototype,
						name,
						Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
						Object.create(null)
					);
				});
			});
		}

		// 데코레이터로 없는 멤버를 만들어 낼 수는 없다. 기존 멤버의 수정만 가능
		const Pausable = (target: typeof Player) => {
			return class Pausable extends target {
				shouldFreeze = false; //
			};
		};

		@Pausable
		class Player {
			x = 0;
			y = 0;
		}


		const player = new Player();
		// player.shouldFreeze;

		type FreezablePlayer = typeof Player & { shouldFreeze: boolean };

		const playerTwo = (new Player() as unknown) as FreezablePlayer;
		console.info(playerTwo.shouldFreeze);

		class DD {
			static testId: string = '11';
		}

		function mixin3<Origin extends Constructor>(OriginClass: Origin) {
			return class TEST extends OriginClass {
				static testId: number = 100000;
			}
		}

		const dd = mixin3(DD);
		console.info(dd.testId);

		res.json({
			declarationMerging: true,
		});
	})
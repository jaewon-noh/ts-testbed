import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		function f() { // decorator factory
			console.log("f(): evaluated");
			return function (
				target: any,
				propertyKey: string,
				descriptor: PropertyDescriptor
			) {
				console.log("f(): called");
			};
		}

		function g() {
			console.log("g(): evaluated");
			return function (
				target: any,
				propertyKey: string,
				descriptor: PropertyDescriptor
			) {
				console.log("g(): called");
			};
		}

		class C {
			@f() // decorator의 사용법
			@g() // test의 decorator를 여러개 설정했다.
			// f가 실행되고 g가 실행되면 내부에서 반환된 함수는 콜스택의 형태를 띄게 되어([f, g]) g -> f순으로 실행 되는 듯.
			// 함수의 합성 개념, 콜스택 개념을 잘 알면 이해하는데에 큰 무리는 없을 듯.
			test() {
				console.info('test(): called');
			}
		}
		const a = new C();
		a.test();

		// class decorator
		// 정확히는 생성자 재정의 예제
		function YDD<T extends { new (...args: any[]): {} }>(constructor: T) {
			return class extends constructor {
				name = 'yddd decorator';
			}
		}
		// method decorator
		function testDecorator(value: string) {
			return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
				const method = descriptor.value;
				descriptor.value = function (this: any, ...args: any[]) {
					this.name += ' teeeest';
					return method.apply(this, args);
				};
			}
		}

		@YDD
		class YD {
			name: string = 'yd';
			constructor(name: string) {
				this.name = name;
			}
			@testDecorator('test')
			getName(lastName: string): string {
				return this.name;
			}
		}

		const yd = new YD('yd');
		console.info(yd.getName('Kim'));

		// accessor decorator // getter와 setter에 설정하는 decorator
		function configurable(value: boolean) {
			return function (
				target: any,
				propertyKey: string,
				descriptor: PropertyDescriptor
			) {
				descriptor.configurable = value;
			};
		}

		// property decorator
		function setGame(gameTitle: string) {
			return function (target: any, name: string): any {
				return {
					writable: true,
					value: gameTitle
				};
			}
		}

		// parameter decorator
		function noEmptyString() {
			return function decorator(target: any, name: string, index: number) {
				target.validators = (args: any): boolean => {
					return args[index] !== '';
				}
			}
		}
		// parameter decorator 대부분 method decorator와 함께 사용하는 듯.
		function validate(target: any, name: string, descriptor: PropertyDescriptor) {
			const originMethod = target[name];
			descriptor.value = function(...args: any[]) {
				if (!target.validators(args)) {
					throw new Error("Invalid");
				}
				return originMethod.apply(this, args);
			}
		}

		class JW {
			@setGame('League of Legends')
			game: string | undefined;
			private _name: string = 'jw';
			constructor(name: string) {
				this._name = name;
			}
			@configurable(false)
			get name(): string {
				return this._name;
			}

			set name(value: string) {
				this._name = value;
			}

			@validate
			do(@noEmptyString() what: string): string {
				return `${this._name} do ${what}`;
			}
		}

		const jw = new JW('jwjw');
		console.info(jw.name);
		console.info(jw.game);
		console.info(jw.do('javascript'));
		console.info(jw.do(''));

		// runtime error가 난다. decorator가 runtime에 실행되기 때문인듯.
		// Object.defineProperty(JW.prototype, 'name', {
		// 	get() {
		// 		console.log('new name getter!');
		// 		return this._name;
		// 	}
		// });

		res.json({
			decorator: true,
		});
	})
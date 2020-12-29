import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		const aa = 'aa'; // const로 선언한 문자열 literal은 typescript가 string이 아닌 'aa'타입으로 해석하게 된다고 한다.
		let bb = 'bb'; // 반면에 let은 재 할달이 가능하기 때문에 단순하게 문자열 타입으로 해석.
		// 위와 같이 타입을 유한하게 줄여가는 기법을 narrowing이라고 한다.
		// const aa = 'aa'; 는 다음과 같다고 해석할 수 있을 듯
		// type aa = 'aa';

		type literal = 'test' | 'test1' | 'test2';

		const test = (param: literal): literal => {
			return param;
		};

		// enum과 유사

		enum testEnum {
			TEST = 'test',
			TEST1 = 'test1',
			TEST2 = 'test2',
		}

		const test2 = (param: testEnum): testEnum => {
			return param;
		};
		// enum도 같은 역할을 수행할 수 있다.

		enum testEnum1 {
			TEST = 'test',
			TEST1 = 'test1',
			TEST2 = 'test2',
		}

		type literal2 = testEnum1.TEST | testEnum1.TEST1 | testEnum1.TEST2;

		const test3 = (param: literal2): literal2 => {
			return param;
		};

		// 조합도 가능하다.

		type numericLiteral = 1 | 2 | 3;

		const test4 = (param: numericLiteral): numericLiteral => {
			return param;
		}

		const test5 = (param: numericLiteral): numericLiteral => {
			return param as numericLiteral;
		}

		// number literal 구성.

		type booleanLiteral = true | false;

		const test6 = (arr: Array<number>): booleanLiteral => {
			return arr.every((val: number): booleanLiteral => {
				return val > 10;
			});
		};

		res.json({
			literal: true,
			test: test('test'),
			test2: test2(testEnum.TEST),
			test3: test3(testEnum1.TEST),
			test4: test4(1),
			test5: test5(3),
			test6: test6([1,2,3,4,5,11,2,3,34,445,56,677,8,9,88,899]),
		});
	})
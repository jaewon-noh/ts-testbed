import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		const test = (param: string | number): string => {
			return String(param);
		};

		type u = string | number; // union을 하나의 타입으로 설정하는것도 가능하다.

		const test2 = (param: u): u => { // 만들어진 타입을 통해 parameter의 타입과 함수의 리턴 타입을 지정하였다.
			return param;
		};

		// 인터페이스, 클래스 타입을 유니언 타입으로 지정할 때 멤버 변수나 멤버 함수가 다른 경우가 분명 생기게 된다.
		// 입력된 타입에 접근해야만 한다면 어떠한 타입인지 알 수 있는 코드를 해당 유니언 타입을 사용하는 쪽에 작성 해줘야 한다 ......

		// type intersectionTest = string & number & boolean & object;
		//
		// const test3 = (param: intersectionTest): never => {
		// 	throw new Error('기본 타입을 intersection 으로 엮으면 never가 된다.');
		// };

		interface inter {
			a: boolean,
			b: string,
		}

		interface section {
			c: object,
			d: number,
		}

		type intersectionTest1 = inter & section;

		const test4 = (param: intersectionTest1): intersectionTest1 => {
			return param;
		};

		res.json({
			unionAndIntersection: true,
			test: test('12'),
			test1: test(1234),
			test2: test2('1231123'),
			test3: test2(1231123),
			test4: test4({a: true, b: 'str', c: {aa: 1}, d: 1}),
		});
	})
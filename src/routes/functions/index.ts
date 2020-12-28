import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		const test = (x: number, y: number): number => { // 리턴 타입까지 명시 해본다.
			return x + y;
		};
		const test2 = (x: number, y: number) => { // 리턴 타입을 명시하지 않는다.
			return x + y;
		};
		const test3: (baseValue: number, increment: number) => number = (x: number, y: number): number => { return x + y; };
		// 아직까지는 이게 필요한지 잘 모르겠음... 동어 반복으로 보임.
		// 아 다 쓸 필요가 없이 생략이 가능하구나
		const test4: (baseValue: number, increment: number) => number = (x, y) => { return x + y; };
		// const test4 = (x: number, y: number): number => { return x + y; }; // 이게 타이핑 상으로는 더 짧은데....

		const test5 = (x: number, y?: number) => {
			if (y) {
				return x + y;
			} else {
				return x;
			}
		};

		const test6 = (x: number, y: string = '22'): string => {
			return x + y;
		};

		const test7 = (a: number, ...args: any[]): Array<any> => {
			return [a, ...args];
		};

		// this 사용을 위해 매개변수 쪽에 this의 타입으로 interface를 설정하거나 class type을 지정한다던가 하는 방법과 arrow function을 사용하는 방법이 있음.
		// 실 사용 전에는 arrow function이 편해보이나..
		// method changing이 가능한 무언가를 구현한다고 하였을 때 리턴되는 this가 정확히 무엇을 의미하는지 지정해두고 사용하면 좋을 듯 보임.

		function test8(a: number): number;
		function test8(a: string): string;
		function test8(a: any): any {
			if (typeof a === 'number') {
				return 1;
			} else if (typeof a === 'string') {
				return {};
			}
		}
		// overloads 의 용도 및 의미를 잘 모르겠음 유니언 타입이나 any로 해결되는 부분이 아닌가 싶지만... 더 확인해볼 필요 있음...

		res.json({
			functions: true,
			test: test(1, 2),
			test2: test2(1, 2),
			test3: test3(1, 2),
			test4: test4(1, 2),
			test5: test5(1, 2),
			test5_1: test5(1),
			test6: test6(1, '33'),
			test6_1: test6(1),
			test7: test7(1, '22', [33], {a: 1}, undefined, null, false),
			test8: test8(1),
			test8_1: test8('11'),
		});
	})
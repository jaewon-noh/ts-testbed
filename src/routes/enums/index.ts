import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		enum STUDY_MEMBERS { // 초기화 하지 않는다면 YD는 0 JW은 1로 number type 이 auto increment 된다.
			YD,
			JW,
		}

		enum STUDY_MEMBERS1 { // number타입으로 초기화 한 경우 그 다음 값으로 auto increment
			YD = 1,
			JW,
		}

		enum STUDY_MEMBERS2 { // string type(number 타입의 상수가 아닌 다른 타입도 마찬가지)으로 초기화 한 값 뒤에 초기화 하지 않는 값이 오는것은 불가능.
			JW, // 가능하며 number 0으로 값 설정
			YD = 'YD',
			// JW2 // 불가능
		}

		enum STUDY_MEMBERS3 {
			JW = 'JW',
			YD = 'YD',
		}

		// 타입을 섞은 enum은 권장되지 않는다.

		const test = (param: STUDY_MEMBERS3.YD): STUDY_MEMBERS3 => { // enum은 타입이 되며 enum의 member도 타입이 될 수 있다
			if (Math.random() > 0.5) {
				return STUDY_MEMBERS3.YD
			} else {
				return STUDY_MEMBERS3.JW
			}
		}

		const test1 = (obj: { YD: string } ) => { // enum은 object로 transpile 되기 때문에 이와 같이 object와의 비교도 가능하다.
			console.info(obj.YD);
		}

		// keyof 객체의 공개 key를 union type으로 리턴한다.
		interface STUDY_MEMBERS4 {
			YD: string,
			JW: string
		}

		type studyMember3 = keyof typeof STUDY_MEMBERS3; // enum의 key들을 union으로 가져오고 싶을 때.
		type studyMember4 = keyof STUDY_MEMBERS4; // 인터페이스는 바로 가져올 수 있음.

		// 숫자 열거형의 역 매핑 (다른 타입의 경우 역 매핑이 없다는 점)
		enum STUDY_MEMBERS5 {
			YD,
			JW
		}
		const a = STUDY_MEMBERS5.YD;
		const nameOfa = STUDY_MEMBERS5[a];

		const test2 = () => {
			return `${a} and ${nameOfa}`;
		}

		// declare enum STUDY_MEMBERS6 {
		// 	A = 1,
		// 	B, // computed로 판단 된다고 함.
		// 	C = 3,
		// }

		// enum STUDY_MEMBERS6 {
		// 	A = 1,
		// 	B, // 일반 enum에서는 상수형으로 판단
		// 	C = 3,
		// }

		res.json({
			enums: true,
			test: test(STUDY_MEMBERS3.YD),
			test1: test1(STUDY_MEMBERS3),
			test2: test2(),
		});
	})
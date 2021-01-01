import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		// js 클래스에 대한 기본 지식은 있으니.. 접근 지정자 부터 시작.
		// public, private, protected
		const TestClass = class {
			// public이 기본값이면 입력을 따로 하지 않아도 된다.
			name: string // 아랫줄과 동일
			// public name: string
			constructor(naame: string) {
				this.name = naame;
			}
		}
		const TestClassInstance = new TestClass('naaame');

		const TestClass2 = class {
			private name: string // ts의 방법
			// #name: string // tc39에서 논의중인(stage 3) private 표기 방법.

			constructor(naame: string) {
				this.name = naame;
				// this.#name = naame;
			}

			getName(): string {
				return this.name; // private 필드라 할지라도 클래스 자기 자신의 내부 멤버에서는 접근이 가능하다.
			}
		}
		const TestClass2Instance = new TestClass2('jaewon');

		// const TestClass2InheritanceClass = class extends TestClass2 {
		// 	constructor() {
		// 		super('inherit');
		// 	}
		//
		// 	getName(): string {
		// 		return this.name; // private 필드라 해당 클래스 이외의 곳에서 접근 불가능.
		// 	}
		// }


		const TestClass3 =  class {
			protected name: string

			constructor(naame: string) {
				this.name = naame;
			}

			getName(): string {
				return this.name;
			}
		}

		const TestClass3Instance = new TestClass3('jaewon');

		const TestClass3InheritanceClass = class extends TestClass3 {
			constructor() {
				super('inherit');
			}

			getName(): string {
				return this.name; // protected 필드는 해당 클래스와, 상속받은 클래스에서 접근 가능
			}
		}

		const TestClass3InheritanceClassInstance = new TestClass3InheritanceClass();


		const TestClass4 = class {
			readonly name: string

			constructor(naame: string) {
				this.name = naame;
			}

			// constructor(readonly name: string) {} // 위의 코드와 동일하게 name을 readonly로 선언하고 들어온 매개변수로 초기화 하는 작동을 한다.
		}

		const TestClass4Instance = new TestClass4('yedarm');
		// TestClass4Instance.name = 'test'; // readonly에 변수 할당이 시도 되었음.

		class TestClass5 {
			private name: string

			constructor(naame: string) {
				this.name = naame;
			}

			get getName(): string { // setter가 설정되지 않고 getter만 있다면 readonly로 추론된다.
				return this.name;
			}
		}

		const TestClass5Instance: TestClass5 = new TestClass5('yedarm'); // 클래스를 변수에 담지 않아야 타입 지정이 가능하다.

		// static 변수나 함수는 넘어간다.

		abstract class TestClass6 {
			abstract getName(): string // 반드시 구현 클래스에서 멤버 함수로써 구현 되어야 함.
		}
		// new TestClass6(); // 추상 클래스는 인스턴스화 할 수 없다.

		// const TestClass6 = abstract class { // 이건 오류가 난다. abstract는 변수에 할당할 수 없는 모양.
		// 	abstract getName(): string
		// }


		const TestClass7 = class extends TestClass6 {
			name: string
			constructor() {
				super();
				this.name = 'yd';
			}

			getName(): string {
				return this.name;
			}

			// getName2(): string { // 추상 클래스에 선언되지 않은 함수.
			// 	return this.name;
			// }
		}

		const TestClass7Instance: TestClass6 = new TestClass7();

		class TestClass8 {
			static staticMemberTest: string = 'jaewon';
			test(): string {
				return TestClass8.staticMemberTest;
			}
		}

		const TestClass8Instance: TestClass8 = new TestClass8();
		console.info(TestClass8Instance.test()); // 이 시점에서는 jaewon
		const TestClass8InstanceMaker = TestClass8; // 아래와 같다.
		// const TestClass8InstanceMaker: typeof TestClass8 = TestClass8;
		TestClass8InstanceMaker.staticMemberTest = 'yedarm'; // 이 시점 이후로 TestClass8.staticMemberTest 의 value는 yedarm;
		const TestClass8Instance1 = new TestClass8InstanceMaker();
		const TestClass8Instance2: TestClass8 = new TestClass8();

		// 타입, 인터페이스로서의 클래스는 이미 보았기 때문에 건너 뜀.

		res.json({
			classed: true,
			test: TestClassInstance.name,
			// test1: TestClass2Instance.name // private이라 외부에서 접근할 수 없다.
			test2: TestClass2Instance.getName(),
			test3: TestClass3Instance.getName(),
			test4: TestClass3InheritanceClassInstance.getName(),
			test5: TestClass4Instance.name,
			test6: TestClass5Instance.getName,
			test7: TestClass7Instance.getName(),
			test8: TestClass8Instance.test(),
			test9: TestClass8Instance1.test(),
			test10: TestClass8Instance2.test()
		});
	})
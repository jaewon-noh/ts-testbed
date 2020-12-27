import { App } from '@tinyhttp/app';

export const app = new App();

interface BASIC_INTERFACE {
	value: string
}

interface OPTIONAL_INTERFACE {
	value?: number
	label?: string
	aa: number
}

interface READ_ONLY_INTERFACE {
	readonly value: number
}

interface FUNCTION_INTERFACE {
	(width: number, height: number): boolean
}

interface NORMAL_CLASS_INTERFACE {
	aa: number,
	getAa(): number
}

interface CONSTRUCTOR {
	new (width: number, height: number): NORMAL_CLASS_INTERFACE
}

const basic = (obj: BASIC_INTERFACE) => {
	return obj;
};

const optional = (obj: OPTIONAL_INTERFACE) => {
	const a: OPTIONAL_INTERFACE = JSON.parse(JSON.stringify(obj));
	delete a.value;
	return a;
}

const readOnly = (obj: READ_ONLY_INTERFACE) => {
	const a: READ_ONLY_INTERFACE = JSON.parse(JSON.stringify(obj));
	// delete a.value; // The operand of a 'delete' operator cannot be a read-only property.
	// a.value = 1; // const 또는 readonly 변수에 할당시도
	return a;
}

// Indexable Types 에 대해서는 아직까지는 우려되는 점만 눈에 띈다.
// 모든 property가 같은 type으로 return되도록 하는 점.
// 그것을 우회하기 위해서 [index: string]: number | string; index쪽의 타입을 유니언으로 걸어야 하는점. (빈대 잡으려다 초가삼간 태우는 것 같아보임..)


const func: FUNCTION_INTERFACE = (width: number, height: number): boolean => { // interface에서 return type이 명시 되었기 때문에 써도 안써도 꼭 boolean을 return해야함.
	return width > height;
}

class Normal implements NORMAL_CLASS_INTERFACE {
	constructor() {}
	aa: number = 1
	getAa():number {
		return this.aa;
	}
}

class ConstructorTest implements NORMAL_CLASS_INTERFACE {
	constructor(width: number, height: number) {}
	aa: number = 1
	getAa():number {
		return this.aa;
	}
}

// hybrid type 다 섞는다... 라이브러리의 코드나 외부 api의 payload로 쓰이는 것이 아니라면... 직접 작성은 지양하는게 좋겠음.

// interface를 interface로 확장 할 수 있으며 interface를 class로 확장 할 수 있다.
// 단순 interface가 private, protected를 지정할 수 없다면 class를 상속받은 interface는 그것까지 딸려옴.

app
	.get('/', (req, res) => {
		const BASIC: BASIC_INTERFACE = { value: 'test' };
		const OPTIONAL: OPTIONAL_INTERFACE = { value: 1, aa: 2 };
		const READ_ONLY: READ_ONLY_INTERFACE = { value: 22 };
		const nomalInstance = new Normal();
		const constructorTestInstance = ((c: CONSTRUCTOR, width: number, height: number) => new ConstructorTest(width, height))(ConstructorTest, 10, 10);
		const ctt: CONSTRUCTOR = class Cti implements NORMAL_CLASS_INTERFACE { // 더 쉬운 방
			constructor(width: number, height: number) {}
			aa: number = 1
			getAa():number {
				return this.aa;
			}
		}
		const ctti: NORMAL_CLASS_INTERFACE = new ctt(10, 10);

		res.json({
			interface: true,
			basic: basic(BASIC),
			optional: optional(OPTIONAL),
			readOnly: readOnly(READ_ONLY),
			// excessTest: basic({value: "11", dd: 1}) // Argument of type '{ value: string; dd: number; }' is not assignable to parameter of type 'BASIC_INTERFACE'.   Object literal may only specify known properties, and 'dd' does not exist in type 'BASIC_INTERFACE'.
			func: func(10, 100),
			normalClass: nomalInstance.getAa(),
			constructorTest: constructorTestInstance.getAa(),
			ctti: ctti.getAa(),
		});
	})
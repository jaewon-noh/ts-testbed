import { TYPES } from './types';

export namespace YD { // namespace는 module레벨에서만 선언이 가능하다. 함수 내부에서는 불가능.
	export const name = 'yd';

	export enum YDSCHOOL {
		ELEM = TYPES.SCHOOL.ELEM,
		MID = TYPES.SCHOOL.MID,
		HIGH = TYPES.SCHOOL.HIGH
	}

	export type YDAGE = Exclude<TYPES.AGE, undefined>;

	export type YDIT = Omit<TYPES.YDI, 'game'>;

	export class YDC {
		name: string = 'yd';
		constructor() {}
	}

	export function phone(): string {
		return 'Galaxy';
	}

	export function testDecorator() {
		return function (
			target: any,
			propertyKey: string,
			descriptor: PropertyDescriptor
		) {
			console.log("testDecorator");
		};
	}
}
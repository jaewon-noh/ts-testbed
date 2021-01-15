export namespace TYPES {
	export interface YDI {
		name: string
		game: string
		study: boolean
	}
	export type AGE = string | number | undefined;
	export enum SCHOOL {
		ELEM = 'ELEM',
		MID = 'MID',
		HIGH = 'HIGH',
	}
}
import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		const BOOLEAN_TYPE: boolean = true;
		const NUMBER_TYPE: number = 1;
		const STRING_TYPE: string = 'Noh';
		const OBJECT_TYPE: object = { a: 1, b: 1};
		const ARRAY_TYPE: Array<number> = [1, 2, 3];
		const ARRAY_TYPE2: Array<object> = [OBJECT_TYPE, OBJECT_TYPE];
		const TUPLE: [number, object] = [1, OBJECT_TYPE];
		enum CUSTOM_POLICY {
			JW = 'JW',
			YD = 'YD'
		}
		const cpJw = CUSTOM_POLICY.JW;
		const cpYd = CUSTOM_POLICY.YD;
		const ANY: any = 1;
		const UNDEFINED: undefined = undefined;
		const NULL: null = null;
		const TYPE_ASSERTION: string = (ANY as number).toFixed(1);

		res.json({
			basicType: true,
			BOOLEAN_TYPE,
			NUMBER_TYPE,
			STRING_TYPE,
			OBJECT_TYPE,
			ARRAY_TYPE,
			ARRAY_TYPE2,
			TUPLE,
			cpJw,
			cpYd,
			ANY,
			UNDEFINED,
			NULL,
			TYPE_ASSERTION
		});
	})
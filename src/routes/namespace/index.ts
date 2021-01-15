import { App } from '@tinyhttp/app';
import { YD } from './functions';

export const app = new App();

app
	.get('/', (req, res) => {
		console.info(YD.name);
		const ydObj: YD.YDIT = {
			name: 'yd',
			study: true
		}
		console.info(ydObj);
		const ydClass: YD.YDC = new YD.YDC();
		console.info(ydClass.name);
		const ydAge: YD.YDAGE = 24;
		// const ydAge: YD.AGE = '24';
		// const ydAge: YD.AGE = undefined;
		console.info(ydAge);
		const ydGraduate: YD.YDSCHOOL = YD.YDSCHOOL.HIGH;
		console.info(ydGraduate);
		const ydPhone: string = YD.phone();
		console.info(ydPhone);

		class testYD {
			constructor() {}

			@YD.testDecorator()
			test(): string {
				return 'test';
			}
		}
		const testYDI = new testYD();
		console.info(testYDI.test());

		res.json({
			namespace: true,
		});
	})
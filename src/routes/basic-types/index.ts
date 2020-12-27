import { App } from '@tinyhttp/app';

export const app = new App();

app
	.get('/', (req, res) => {
		res.json({
			basicType: true,
		});
	})
import { App } from '@tinyhttp/app';
import { app as basicRouter } from "./basic-types";

export const app = new App();

app
	.use('/', (req, res) => {
		res.json({root: true});
	})
	.use('/basic-types', basicRouter);
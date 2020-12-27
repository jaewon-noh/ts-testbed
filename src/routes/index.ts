import { App } from '@tinyhttp/app';
import { app as basicRouter } from "./basic-types";

export const app = new App();

app
	.use('/basic-types', basicRouter);
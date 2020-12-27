import { App } from '@tinyhttp/app';
import { app as basicRouter } from "./basic-types";
import { app as interfaceRouter } from "./interface";

export const app = new App();

app
	.use('/basic-types', basicRouter)
	.use('/interface', interfaceRouter);
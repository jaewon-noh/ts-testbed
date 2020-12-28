import { App } from '@tinyhttp/app';
import { app as basicRouter } from "./basic-types";
import { app as interfaceRouter } from "./interface";
import { app as functionsRouter } from "./functions";

export const app = new App();

app
	.use('/basic-types', basicRouter)
	.use('/interface', interfaceRouter)
	.use('/functions', functionsRouter);
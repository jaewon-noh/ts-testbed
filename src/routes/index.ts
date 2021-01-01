import { App } from '@tinyhttp/app';
import { app as basicRouter } from "./basic-types";
import { app as interfaceRouter } from "./interface";
import { app as functionsRouter } from "./functions";
import { app as literalRouter } from "./literal";
import { app as unionAndIntersectionRouter } from "./union-and-intersection";
import { app as classesRouter } from "./classes";

export const app = new App();

app
	.use('/basic-types', basicRouter)
	.use('/interface', interfaceRouter)
	.use('/functions', functionsRouter)
	.use('/literal', literalRouter)
	.use('/union', unionAndIntersectionRouter)
	.use('/classes', classesRouter);
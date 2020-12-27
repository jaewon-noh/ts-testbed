import { App } from '@tinyhttp/app';
import type { Request, Response } from '@tinyhttp/app';
import { app as router } from './routes';

const app = new App<any, Request, Response>();

app.use(router);

app.listen(3000, () => console.log('Started on http://localhost:3000'));
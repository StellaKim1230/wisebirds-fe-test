import express from 'express';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from './handlers';

const app = express();
const port = 4000;

app.use(express.json());
app.use(createMiddleware(...handlers));

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));

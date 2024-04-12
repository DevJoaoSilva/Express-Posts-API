import { Router } from 'express'
import { createPost } from './controllers/createPost';
import { checkSchema } from 'express-validator';
import createPostValidationSchema from './controllers/createPost/createPostValidationSchema';

const routes = Router();

routes.get('/', (req, res)=> res.send('hi'));
routes.post('/posts', checkSchema(createPostValidationSchema), createPost);

export default routes;
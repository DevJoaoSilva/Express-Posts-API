import { Router } from 'express'
import { createPost } from './controllers/createPost';
import { checkSchema } from 'express-validator';
import createPostValidationSchema from './controllers/createPost/createPostValidationSchema';
import { getPosts } from './controllers/getPosts';

const routes = Router();

routes.get('/', (req, res)=> res.send('hi'));
routes.get('/posts', getPosts);
routes.post('/posts', checkSchema(createPostValidationSchema), createPost);

export default routes;
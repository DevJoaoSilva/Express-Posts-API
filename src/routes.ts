import { Router } from 'express';
import { createPost } from './controllers/createPost';
import { checkSchema, param } from 'express-validator';
import createPostValidationSchema from './controllers/createPost/createPostValidationSchema';
import { getPosts } from './controllers/getPosts';
import { getPost } from './controllers/getPost';

const routes = Router();

routes.get('/', (req, res) => res.send('hi'));
routes.get('/posts', getPosts);
routes.get(
    '/posts/:id',
    param('id').trim().notEmpty().withMessage('Id cant be empty').escape(),
    getPost
);
routes.post('/posts', checkSchema(createPostValidationSchema), createPost);

export default routes;

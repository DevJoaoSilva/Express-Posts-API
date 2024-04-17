import { Router } from 'express';
import { createPost } from './controllers/createPost';
import { checkSchema, param } from 'express-validator';
import createPostValidationSchema from './controllers/createPost/createPostValidationSchema';
import { getPosts } from './controllers/getPosts';
import { getPost } from './controllers/getPost';
import { updatePost } from './controllers/updatePost';
import updatePostValidationSchema from './controllers/updatePost/updatePostValidationSchema';

const routes = Router();

routes.get('/', (req, res) => res.send('hi'));
// Post
routes.get('/posts', getPosts);
routes.get(
    '/posts/:id',
    param('id').trim().notEmpty().withMessage('Id cant be empty').escape(),
    getPost
);
routes.post('/posts', checkSchema(createPostValidationSchema), createPost);
routes.patch(
    '/posts/:id',
    param('id').trim().notEmpty().withMessage('Id cant be empty').escape(),
    checkSchema(updatePostValidationSchema),
    updatePost
);

export default routes;

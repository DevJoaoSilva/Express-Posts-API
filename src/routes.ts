import { Router } from 'express';
import { createPost } from './controllers/createPost';
import { checkSchema, param } from 'express-validator';
import createPostValidationSchema from './controllers/createPost/createPostValidationSchema';
import { getPosts } from './controllers/getPosts';
import { getPost } from './controllers/getPost';
import { updatePost } from './controllers/updatePost';
import updatePostValidationSchema from './controllers/updatePost/updatePostValidationSchema';
import { deletePost } from './controllers/deletePost';

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

const routes = Router();

routes.get('/', (req, res) => res.send('hi'));
// Documentation
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
    updatePostValidationSchema,
    updatePost
);
routes.delete(
    '/posts/:id',
    param('id').trim().notEmpty().withMessage('Id cant be empty').escape(),
    deletePost
);

export default routes;

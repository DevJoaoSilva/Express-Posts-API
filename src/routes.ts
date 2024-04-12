import { Router } from 'express'
import { createPost } from './useCases/createPost';

const routes = Router();

routes.get('/', (req, res)=> res.send('hi'));
routes.post('/posts', createPost);

export default routes;
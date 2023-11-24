import { Router } from 'express';
import RouteV1 from './v1';

const routes = Router();

routes.use('/v1', RouteV1());

export default routes;

import { Router, Request, Response } from 'express';

const router = Router();

export default () => {
  router.get('/', (req: Request, res: Response) => {
    res.status(200).send({ status: 200, message: 'Router v1' });
  });

  return router;
};

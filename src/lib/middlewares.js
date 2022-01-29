import Cors from 'cors';
import helmet from 'helmet';
import nextConnect from 'next-connect';

import connectDB from '../db/config.db';

export const cors = () =>
  Cors({
    methods: ['GET', 'POST', 'PUT'],
    origin: true,
    credentials: true,
  });

export const headers = () => (_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Credentials', 1);
  next();
};

export const connectDatabase = () => connectDB((_req, _res, next) => next());

export const checkAuth =
  (message = 'Vous devez vous connecter pour accéder à cette ressource') =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: message });
    return next();
  };

const middleware = nextConnect()
  .use(cors())
  .use(headers())
  .use(helmet())
  .use(connectDatabase());

export default middleware;

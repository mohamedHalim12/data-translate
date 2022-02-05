// @ts-nocheck
import nextConnect from 'next-connect';

import { getSentences } from '@/db/queries/sentences.queries';
import AppError from '@/lib/errors';
import middleware from '@/lib/middlewares';

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    try {
      const { start, limit = 10, meta = false, stype } = req.query;
      if (stype !== 'sentences') throw new AppError('Invalid slug', 404);
      const result = await getSentences(
        Number(start),
        Number(limit),
        JSON.parse(meta || false),
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(e.code || 500).json({ message: e.message });
    }
  });

export default handler;

// @ts-nocheck
import nextConnect from 'next-connect';

import { getRandomSentences } from '@/db/queries/sentences.queries';
import middleware from '@/lib/middlewares';
import { castToAppError } from '@/lib/utils';

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    try {
      const { limit = 10, meta = false } = req.query;
      const result = await getRandomSentences(
        Number(limit),
        JSON.parse(meta || false),
      );
      res.status(200).json(result);
    } catch (e) {
      const error = castToAppError(e);
      res.status(error.code || 400).json({ message: error.message || 'Error' });
    }
  });

export default handler;

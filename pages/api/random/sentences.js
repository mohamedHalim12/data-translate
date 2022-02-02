// @ts-nocheck
import nextConnect from 'next-connect';

import { getRandomSentences } from '@/db/queries/sentences.queries';
import middleware from '@/lib/middlewares';

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
      res.status(e.code || 500).json({ message: e.message });
    }
  });

export default handler;

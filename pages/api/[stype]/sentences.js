import nextConnect from 'next-connect';

import { querySentences } from '@/db/queries/sentences.queries';
import AppError from '@/lib/errors';
import middleware from '@/lib/middlewares';

const possibleSlugs = Object.keys(querySentences);

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    try {
      const { start = 0, limit = 10, meta = false, stype } = req.query;
      if (!possibleSlugs.includes(stype)) {
        throw new AppError('Invalid slug', 404);
      }

      /** @type {QueriedSentences} */
      const result = await querySentences[stype](
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

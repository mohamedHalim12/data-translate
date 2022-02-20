// @ts-nocheck
import { isValidObjectId } from 'mongoose';
import nextConnect from 'next-connect';

import {
  getSentences,
  getSentencesBeginWithId,
} from '@/db/queries/sentences.queries';
import AppError from '@/lib/errors';
import middleware from '@/lib/middlewares';

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    try {
      const { start = 1, limit = 10, startId, meta = false, stype } = req.query;
      if (stype !== 'sentences') throw new AppError('Invalid slug', 404);
      const result = startId
        ? await getSentencesUsingIdLimit(startId, limit, meta)
        : await getSentencesUsingStartLimit(start, limit, meta);
      res.status(200).json(result);
    } catch (e) {
      res.status(e.code || 500).json({ message: e.message });
    }
  });

export default handler;
async function getSentencesUsingStartLimit(
  start = 1,
  limit = 10,
  meta = false,
) {
  return getSentences(Number(start), Number(limit), meta === 'true');
}

async function getSentencesUsingIdLimit(startId, limit, meta) {
  if (!isValidObjectId(startId)) throw new AppError('Invalid id', 400);

  return getSentencesBeginWithId({
    startId,
    limit: Number(limit),
    meta: meta === 'true',
  });
}

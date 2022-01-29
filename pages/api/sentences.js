import nextConnect from 'next-connect';

import { getSentences } from '../../src/db/models/queries/sentences.queries';
import middleware from '../../src/lib/middlewares';

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const { start = 0, limit = 10 } = req.query;
    const sentences = await getSentences(Number(start), Number(limit));
    res.json(sentences);
  });

export default handler;

import nextConnect from 'next-connect';

import { getUntranslatedSentences } from '../../src/db/models/queries/sentences.queries';
import middleware from '../../src/lib/middlewares';
/**
 * Retrieve data in
 */
const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const { start = 0, limit = 10, meta = false } = req.query;
    const sentences = await getUntranslatedSentences(
      Number(start),
      Number(limit),
      JSON.parse(meta || false),
    );
    res.status(200).json(sentences);
  });

export default handler;

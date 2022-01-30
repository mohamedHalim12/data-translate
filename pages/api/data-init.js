import nextConnect from 'next-connect';

import { importSentences } from '../../src/db/models/queries/sentences.queries';
import Sentences from '../../src/db/models/sentences.model';
import middleware from '../../src/lib/middlewares';

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    try {
      const sentencesCount = await Sentences.countDocuments();
      if (sentencesCount) {
        res.status(200).json({
          status: 'success',
          message: 'Sentences already imported',
        });
      }
      importSentences('data/french_data.csv');
      res.status(206).json({ message: '🥸 Importing sentences...' });
    } catch (e) {
      res.status(e.code || 400).json({ message: 'Error importing sentences' });
    }
  });

export default handler;

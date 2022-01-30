import nextConnect from 'next-connect';
import path from 'path';

import Sentences from '../../src/db/models/sentences.model';
import { importSentences } from '../../src/db/queries/sentences.queries';
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
        return;
      }
      const filePath = 'data/french_data.csv';
      const fullPath = path.join(process.cwd(), filePath);
      importSentences(fullPath);
      res.status(201).json({ message: '🥸 Importation finished' });
    } catch (e) {
      res.status(e.code || 400).json({ message: 'Error importing sentences' });
    }
  });

export default handler;

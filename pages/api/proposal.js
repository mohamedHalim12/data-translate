/* eslint-disable camelcase */
import nextConnect from 'next-connect';

import {
  addAproposition,
  createWaitingQueue,
  existsAPropositions,
  existsSameProposition,
} from '../../src/db/queries/waitingQueue.queries';
import AppError from '../../src/lib/errors';
import middleware from '../../src/lib/middlewares';
import { generateUniqueId } from '../../src/lib/utils';
/**
 * Retrieve data in
 */
const handler = nextConnect()
  .use(middleware)
  .post(async (req, res) => {
    const {
      idText_vo,
      translated_text: translated,
      translated_by = 'Anonyme',
    } = req.body;

    try {
      if (!idText_vo) throw new AppError('Text id is required', 400);
      if (!translated)
        throw new AppError('The Text translated is required', 400);

      const translated_text = String(translated).trim();

      if (!(await existsAPropositions(idText_vo))) {
        const proposition = await createWaitingQueue({
          idText_vo,
          translated_text,
          translated_by,
          translation_date: Date(Date.now),
        });
        res.status(202).json(proposition);
        return;
      }

      const { id } = generateUniqueId(translated_text);
      if (await existsSameProposition(id)) {
        const message = `The same translation already exists for this text`;
        res.status(200).json({ message });
        return;
      }

      const update = {
        translated_text,
        translated_by,
        translation_date: Date(Date.now),
      };
      const proposition = await addAproposition(idText_vo, update);
      res.status(202).json(proposition);
    } catch (e) {
      res.status(e.code || 400).json({ message: e.message || 'Error' });
    }
  });

export default handler;

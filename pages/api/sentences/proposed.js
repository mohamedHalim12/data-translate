// @ts-nocheck
/* eslint-disable camelcase */
import { isValidObjectId } from 'mongoose';
import nextConnect from 'next-connect';

import {
  addAproposition,
  createWaitingQueue,
  existsAPropositions,
  existsSameProposition,
  getPropositionByIdTextVo,
} from '@/db/queries/waitingQueue.queries';
import AppError from '@/lib/errors';
import middleware from '@/lib/middlewares';
import { generateUniqueId } from '@/lib/utils';

const handler = nextConnect().use(middleware);

handler.post(async (req, res) => {
  const {
    idText_vo,
    translated_text: translated,
    translated_by = 'Anonyme',
  } = req.body;

  try {
    if (!idText_vo) throw new AppError('Text id is required', 400);
    if (!translated) throw new AppError('The Text translated is required', 400);

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
      res.status(409).json({ message });
      return;
    }

    const update = {
      translated_text,
      translated_by,
      translation_date: Date.now(),
    };
    const proposition = await addAproposition(idText_vo, update);
    res.status(202).json(proposition);
  } catch (e) {
    res.status(e.code || 400).json({ message: e.message || 'Error' });
  }
});

handler.get(async (req, res) => {
  const { tid, meta = false } = req.query;
  try {
    if (!tid)
      throw new AppError('Un ID de texte version original est requis', 400);
    if (!isValidObjectId(tid))
      throw new AppError('Vous devez fournir un id valide', 400);
    const proposed = await getPropositionByIdTextVo({
      idTextVo: tid,
      meta: meta === 'true',
    });
    if (!proposed) throw new AppError('Aucune proposition trouv??e', 200);
    res.status(200).json(proposed);
  } catch (e) {
    res.status(e.code || 400).json({ message: e.message || 'Error' });
  }
});

export default handler;

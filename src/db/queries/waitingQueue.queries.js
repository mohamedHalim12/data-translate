/* eslint-disable camelcase */
import AppError from '../../lib/errors';
import { generateUniqueId } from '../../lib/utils';
import WaitingQueue from '../models/wainting_queue.model';
/**
 * @param {object} props
 * @param {ObjectId} props.idText_vo
 * @param {string} props.translated_text
 * @param {string} props.translated_by
 * @param {Date} props.translation_date
 * @param {string|ObjectId} props.accepted_by
 * @param {Date} props.acception_date
 */
export const createWaitingQueue = async ({
  idText_vo,
  translated_text,
  translated_by,
  translation_date = undefined,
  accepted_by = undefined,
  acception_date = undefined,
}) => {
  if (!idText_vo)
    throw new AppError('The text id is required but nothing was given', 400);
  if (!translated_text)
    throw AppError('The text translated is required but nothing wa given', 400);
  const _id = generateUniqueId(translated_text).id;
  return WaitingQueue.create({
    idText_vo,
    propositions: [{ _id, translated_text, translated_by, translation_date }],
    acception_date,
    accepted_by,
  });
};

export const getProposedTranslations = async (
  skip = 0,
  limit = 10,
  criterias = {},
) => {
  const sentences = WaitingQueue.find({ ...criterias }, { id: '$_id', _id: 0 })
    .skip(skip)
    .limit(limit)
    .populate('idText_vo')
    .lean()
    .exec();

  const totalSentences = await WaitingQueue.countDocuments(criterias).exec();
  const next = totalSentences ? skip + limit : -1;
  const nextStart = next > totalSentences ? totalSentences : next;
  const count = sentences.length;
  return { next: nextStart, totalSentences, sentences, count };
};

/**
 * @param {string} _id
 */
export const existsSameProposition = async (_id) => {
  return WaitingQueue.exists({ propositions: { $elemMatch: { _id } } });
};

/**
 * @param {string} idText_vo
 */
export const existsAPropositions = async (idText_vo) =>
  WaitingQueue.exists({ idText_vo });

/**
 * @param {string} idText_vo
 * @param {object} update
 * @param {string} update._id
 * @param {string} update.translated_text
 * @param {string} update.translated_by
 * @param {Date} update.translation_date
 */

export const addAproposition = async (idText_vo, update) => {
  const { _id, translated_text, translated_by, translation_date } = update;
  const newProposition = {
    _id: _id || generateUniqueId(translated_text).id,
    translated_text,
    translated_by,
    translation_date: translation_date || Date(Date.now),
  };
  return WaitingQueue.findOneAndUpdate(
    { idText_vo },
    { $push: { propositions: newProposition } },
    { new: true },
  )
    .lean()
    .exec();
};

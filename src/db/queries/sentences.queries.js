/* eslint-disable camelcase */

import CsvReadableStream from 'csv-reader';
import fs from 'fs';

import AppError from '../../lib/errors';
import Sentences from '../models/sentences.model';
import { getData } from './queries.utils';

/**
 * @typedef {import('mongoose').Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} Model
 */

const langs = { fr: 'Français', km: 'Chikomori' };

/**
 * @typedef {object} sentence
 * @property {string} text_vo
 * @property {string} translated_text
 * @property {string} translated_by
 * @property {Date} translation_date
 * @property {string|ObjectId} accepted_by
 *
 * @param {sentence} props
 */
export const createSentence = async ({
  text_vo,
  translated_text = '',
  translated_by = '',
  translation_date = undefined,
  accepted_by = undefined,
}) => {
  if (!text_vo) {
    throw new AppError('Missing required fields', 400);
  }

  return Sentences.create({
    text_vo,
    translated_text,
    translated_by,
    translation_date,
    accepted_by,
  });
};

/**
 * @param {sentence[]} sentences
 */
export const createManySentences = async (sentences) =>
  Sentences.insertMany(sentences);

export const getSentences = async (
  skip = 0,
  limit = 10,
  meta = false,
  criterias = {},
) => {
  let filter = {};
  if (meta === true) {
    filter = { translated_by: 1, createdAt: 1, updatedAt: 1 };
  }
  const projection = {
    text_vo: 1,
    translated_text: 1,
    text_id: '$_id',
    ...filter,
    _id: 0,
  };
  const props = { model: Sentences, criterias, projection, skip, limit };
  const result = await getData(props);
  const data = { langs, ...result };
  if (!result.data.length) delete data.langs;
  return data;
};

export const getUntranslatedSentences = async (
  skip = 0,
  limit = 10,
  meta = false,
) => getSentences(skip, limit, meta, { translated_text: { $eq: '' } });

export const getTranslatedSentences = async (
  skip = 0,
  limit = 10,
  meta = false,
) => getSentences(skip, limit, meta, { translated_text: { $ne: '' } });

/** @param {string|ObjectId} id */
export const getSentenceById = async (id) => {
  const sentence = await Sentences.findById(id);
  if (!sentence) throw new AppError('Sentence not found', 404);
  return sentence;
};

/**
 * @param {string|ObjectId} id
 * @param {Object<string,any>} update
 */
export const updateSentenceById = async (id, update = {}) => {
  const sentence = await Sentences.findByIdAndUpdate(id, update, { new: true });
  if (!sentence) throw new AppError('Sentence not found', 404);
  return sentence;
};

/** @param {string|ObjectId} id */
export const deleteSentenceById = async (id) => {
  const sentence = await Sentences.findByIdAndDelete(id);
  if (!sentence) throw new AppError('Sentence not found', 404);

  return sentence;
};

export const deleteAllSentences = async () => {
  return Sentences.deleteMany({});
};

/* eslint-disable no-console */

/** @param {string} filePath */
export const importSentences = async (filePath) => {
  if (!filePath) {
    throw new AppError('Missing required fields', 400);
  }
  const csvStream = fs.createReadStream(filePath, 'utf8');
  const csvReadableStream = new CsvReadableStream({ trim: true });
  const sentences = [];
  let i = 0;
  csvStream
    .pipe(csvReadableStream)
    .on('data', async (row) => {
      // @ts-ignore
      const [, text_vo] = row;
      sentences.push({ text_vo });
      i += 1;
      if (i % 2000 === 0) {
        console.log('>', `${i} rows imported`);
        csvStream.pause();
        await createManySentences(sentences);
        sentences.length = 0;
        csvStream.resume();
      }
    })
    .on('end', async () => {
      csvStream.close();
      console.log('>', `${i} has been imported successfully! 🦾🥸 👍`);
    })
    .on('error', (err) => {
      console.log('😿 >', `Error importing sentences: ${err}`);
      throw new AppError('Error importing sentences', 500);
    });
};

/* eslint-disable no-console */

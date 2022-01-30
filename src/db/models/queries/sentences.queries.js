/* eslint-disable camelcase */

import CsvReadableStream from 'csv-reader';
import fs from 'fs';

import AppError from '../../../lib/errors';
import Sentences from '../sentences.model';

export const createSentence = async ({
  text_vo,
  text_translated = '',
  translated_by = '',
  translation_date = undefined,
  accepted_by = undefined,
}) => {
  if (!text_vo) {
    throw new AppError('Missing required fields', 400);
  }

  const sentences = await Sentences.create({
    text_vo,
    text_translated,
    translated_by,
    translation_date,
    accepted_by,
  });

  return sentences;
};

export const createManySentences = async (sentences) => {
  const createdSentences = await Sentences.insertMany(sentences);
  return createdSentences;
};

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
    text_translated: 1,
    text_id: '$_id',
    ...filter,
    _id: 0,
  };
  const sentences = await Sentences.find({ ...criterias }, { ...projection })
    .skip(skip)
    .limit(limit)
    .exec();
  const totalSentences = await Sentences.countDocuments({ ...criterias });
  const next = totalSentences ? skip + limit : -1;
  const nextStart = next > totalSentences ? totalSentences : next;
  return { next: nextStart, totalSentences, sentences };
};

export const getUntranslatedSentences = async (
  skip = 0,
  limit = 10,
  meta = false,
) => getSentences(skip, limit, meta, { text_translated: { $eq: '' } });

export const getTranslatedSentences = async (
  skip = 0,
  limit = 10,
  meta = false,
) => getSentences(skip, limit, meta, { text_translated: { $ne: '' } });

export const getSentenceById = async (id) => {
  const sentence = await Sentences.findById(id);
  if (!sentence) throw new AppError('Sentence not found', 404);
  return sentence;
};

export const updateSentenceById = async (id, update = {}) => {
  const sentence = await Sentences.findByIdAndUpdate(id, update, { new: true });
  if (!sentence) throw new AppError('Sentence not found', 404);
  return sentence;
};

export const deleteSentenceById = async (id) => {
  const sentence = await Sentences.findByIdAndDelete(id);
  if (!sentence) throw new AppError('Sentence not found', 404);

  return sentence;
};

export const deleteAllSentences = async () => {
  return Sentences.deleteMany({});
};

/* eslint-disable no-console */
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
      const [, text_vo] = row;
      sentences.push({ text_vo });
      i += 1;
      if (i % 5000 === 0) {
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

/* eslint-disable camelcase */
// import CsvReadableStream from 'csv-reader';
// import fs from 'fs';

import AppError from '../../../lib/errors';
import Sentences from '../sentences.model';

export const createSentences = async ({
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

export const getSentences = async (skip = 0, limit = 10) => {
  const projection = {
    text_vo: 1,
    text_translated: 1,
    translated_by: 1,
    createdAt: 1,
    updatedAt: 1,
    id: '$_id',
    _id: 0,
  };
  const sentences = await Sentences.find({}, projection)
    .skip(skip)
    .limit(limit)
    .exec();
  const totalCount = await Sentences.countDocuments();
  return { sentences, totalCount, next: skip + limit };
};

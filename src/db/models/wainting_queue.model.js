import { model, models, Schema } from 'mongoose';

import Sentences from './sentences.model';

const waitingQueueSchema = new Schema(
  {
    idText_vo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Sentences,
    },
    propositions: [
      {
        _id: { type: String, required: true },
        translated_text: { type: String, required: true },
        translated_by: { type: String, required: true },
        translation_date: { type: Date, default: Date.now },
        votes: {
          like: { type: Number, default: 0 },
          dislike: { type: Number, default: 0 },
        },
      },
    ],
    acception_date: { type: Date },
    accepted_by: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, versionKey: false },
);

waitingQueueSchema.index({ idText_vo: 1 });
const WaitingQueue =
  models.WaitingQueue || model('WaitingQueue', waitingQueueSchema);

models.WaitingQueue = WaitingQueue;

export default WaitingQueue;

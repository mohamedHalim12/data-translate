import { model, models, Schema } from 'mongoose';

const waitingQueueSchema = new Schema(
  {
    text_vo: { type: String, required: true },
    text_translated: { type: String, default: '' },
    translated_by: { type: String, default: '' },
    translation_date: { type: Date, default: Date.now },
    accepted_by: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, versionKey: false },
);

const WaitingQueue =
  models.WaitingQueue || model('WaitingQueue', waitingQueueSchema);

models.WaitingQueue = WaitingQueue;

export default WaitingQueue;

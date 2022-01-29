import { model, models, Schema } from 'mongoose';

const sentencesSchema = new Schema(
  {
    text_vo: { type: String, required: true },
    text_translated: { type: String, default: '' },
    translated_by: { type: String, default: '' },
    translation_date: { type: Date, default: undefined },
    accepted_by: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, versionKey: false },
);

const Sentences = models.Sentences || model('Sentences', sentencesSchema);

models.Sentences = Sentences;

export default Sentences;

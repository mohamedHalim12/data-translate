import { model, models, Schema } from 'mongoose';

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const Admin = models.Admin || model('Admin', adminSchema);

models.Admin = Admin;

export default Admin;

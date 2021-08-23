import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  name: String,
  desc: String,
  priority: Number
}, {
  timestamps: true
});

export const Task = model('task', taskSchema);
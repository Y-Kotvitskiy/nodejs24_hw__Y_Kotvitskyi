import * as mongoose from 'mongoose';

export const MonUser = new mongoose.Schema({
  name: String,
  age: Number,
});

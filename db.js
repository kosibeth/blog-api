import mongoose from 'mongoose';
import logger from './logger.js'
import { env } from './env.js';

const connect = async () => {
  try {
    await mongoose.connect(env.mongoURI);
  } catch (err) {
    logger.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

export default {
  connect
}

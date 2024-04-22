import logger from '../logger.js';
import { errorJson } from '../error.js'

export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(err);

  errorJson(res, err, statusCode);
  // res.status(statusCode).json({
  //   status: 'error',
  //   statusCode,
  //   message: err.message,
  //   stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  // });
};
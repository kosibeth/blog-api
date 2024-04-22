
import morgan from 'morgan';
import logger from "../logger.js";

const stream = {
  write: (message) => logger.http(message),
};

export default  morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream }
);

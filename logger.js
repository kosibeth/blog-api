import winston from 'winston';
 
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const getCurrentLevel = () => {
  const env = process.env.NODE_ENV || 'development'

  return env === 'development' ? 'debug' : 'warn'
}

const logLevelcolors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(logLevelcolors)


const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]


const logger = winston.createLogger({
  level: getCurrentLevel(),
  levels,
  format,
  transports,
})

export default logger

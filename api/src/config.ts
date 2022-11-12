import convict from 'convict';

export const config = convict({
  port: {
    doc: 'API server port',
    format: Number,
    env: 'API_PORT',
    default: 3000,
  },
  db: {
    file: {
      doc: 'SQLite db file path',
      format: String,
      env: 'SQLITE_FILE',
      default: '../database/stock.sqlite',
    },
  },
});
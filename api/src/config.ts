import convict from 'convict';

export const config = convict({
  env: {
    doc: 'App enviroment',
    format: ['development', 'test'],
    env: 'NODE_ENV',
    default: 'development',
  },
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
      default: './database/stock.sqlite',
    },
  },
  test: {
    file: {
      doc: 'SQLite db test file path',
      format: String,
      env: 'SQLITE_FILE_TEST',
      default: './database/test.sqlite',
    },
  }
});

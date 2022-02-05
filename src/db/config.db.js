/* eslint-disable no-console */
import chalk from 'chalk';
import { connect, connection } from 'mongoose';

/**
 * Connect to the database, and configure it.
 * @param {string} dbName Database name to use in development.
 * @param {boolean} testing Whether or not we are in testing mode.
 * If so, the database name will have a `test` suffix.
 *
 * @example
 * // In testing mode (`data-translate-test`)
 * await initiateDbConnexion('data-translate', true);
 * // In non test mode (`data-translate`)
 * await initiateDbConnexion('data-translate', false);
 */
export async function initiateDbConnexion(
  dbName = 'data-translate',
  testing = false,
) {
  const DB_URL = `mongodb://localhost:27017/${dbName}`;
  const TEST_DB_URL = `${DB_URL}-test`;
  const DB_URI = testing ? TEST_DB_URL : process.env.DB_URI || DB_URL;
  try {
    console.log('\n>', chalk.blue(`Connecting to ${DB_URI}...`));
    await connect(DB_URI);
    const connected = chalk.yellowBright('MongoDB Connection established');
    const { host, port, name } = connection;
    const conString = chalk.bold(`${host}:${port}/${name}`);
    console.log();
    console.log('>', `${connected} on ${conString}`, '\n');
    console.log();
    return connection;
  } catch (err) {
    return console.log('>', chalk.red(`MongoDB Connection error `, err, '\n'));
  }
}

export default function connectDB(handler) {
  return async (req, res, next) => {
    if (connection.readyState) return handler(req, res, next);
    await initiateDbConnexion();
    return handler(req, res, next);
  };
}

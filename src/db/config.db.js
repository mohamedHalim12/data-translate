/* eslint-disable no-console */
import chalk from 'chalk';
import { connect, connection } from 'mongoose';

export async function initiateDbConnexion() {
  const DEV_DB_URI = 'mongodb://localhost:27017/data-translate';
  // const DEV_DB_URI =
  //   'mongodb+srv://acem:dB6bc8U5vHUnmQ8@cluster0.2nlmg.mongodb.net/data-translate?retryWrites=true&w=majority';
  const DB_URI = process.env.DB_URI || DEV_DB_URI;
  try {
    await connect(DB_URI);
    const connected = chalk.yellowBright('MongoDB Connection established');
    const { host, port, name } = connection;
    const conString = chalk.bold(`${host}:${port}/${name}`);
    console.log();
    console.log('>', `${connected} on ${conString}`);
    console.log();
  } catch (err) {
    console.log('>', chalk.red(`MongoDB Connection error `, err));
  }
}

export default function connectDB(handler) {
  return async (req, res, next) => {
    if (connection.readyState) return handler(req, res, next);
    await initiateDbConnexion();
    return handler(req, res, next);
  };
}

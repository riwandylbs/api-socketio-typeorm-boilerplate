require('dotenv').config()

export const port = process.env.PORT || 3000;

export const DB_MYSQL_HOST = process.env.DB_MYSQL_HOST || "localhost";
export const DB_MYSQL_PORT = parseInt(process.env.DB_MYSQL_PORT) || 3306;
export const DB_MYSQL_USERNAME = process.env.DB_MYSQL_USERNAME;
export const DB_MYSQL_PASSWORD = process.env.DB_MYSQL_PASSWORD;
export const DB_MYSQL_NAME = process.env.DB_MYSQL_NAME || "db_name";


export const jwtExpiry = parseInt(process.env.JWT_EXPIRY) || 60;
export const jwtSecret = process.env.JWT_SECRET;

export const API_KEY = process.env.API_KEY;

export const SOCKET_AUTH_TOKEN = process.env.SOCKET_AUTH_TOKEN
export const SOCKET_PORT = process.env.SOCKET_PORT

export const RMQ_HOST = process.env.RMQ_HOST
export const RMQ_PASSWORD = process.env.RMQ_PASSWORD
export const RMQ_PORT = process.env.RMQ_PORT
export const RMQ_USERNAME = process.env.RMQ_USERNAME

export const QUEUE_CALLBACK_NAME = process.env.QUEUE_CALLBACK_NAME

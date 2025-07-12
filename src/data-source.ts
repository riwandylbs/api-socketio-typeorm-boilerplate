import "reflect-metadata"
import { DataSource } from "typeorm"
import { DB_MYSQL_HOST, 
    DB_MYSQL_NAME, 
    DB_MYSQL_PASSWORD, 
    DB_MYSQL_PORT, 
    DB_MYSQL_USERNAME 
} from "./config"


export const MySQLDataSource = new DataSource({
    type: "mysql",
    host: DB_MYSQL_HOST,
    port: DB_MYSQL_PORT,
    username: DB_MYSQL_USERNAME,
    password: DB_MYSQL_PASSWORD,
    database: DB_MYSQL_NAME,
    synchronize: false,
    logging: false,
    // entities: [],
    entities: [__dirname + "/entity/*{.js,.ts}"],
    migrations: [],
    subscribers: [],
})

import * as express from "express"
import * as bodyParser from "body-parser"
import * as morgan from 'morgan'
import { authentication } from "./middleware/Authentication"
import router from "./routes"
import './socket-io/server'

// create express app
const app = express()

// implement cors
var cors = require('cors')

app.use(cors());
app.use(authentication)
app.use(morgan('tiny'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(router)

export default app;
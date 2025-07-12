import {  MySQLLockerDataSource } from "./data-source"
import { port } from "./config"
import app from "./app"
import { runScheduler } from "./scheduler";
import { consumeRMQMessages } from "./queue/rmq-pubsub";

(async() => {

    if (!MySQLLockerDataSource.isInitialized) {
        MySQLLockerDataSource.initialize().then(async() => {
            // start express server
            app.listen(port)
            console.log(`Express server has started on port ${port}`)
            console.log(`Data Source MySQL for locker has been initialized`);
            // runScheduler()

            // RUN RMQ
            consumeRMQMessages()
        }).catch((error) => {
            console.log(error);
        })
    }
})().then( (e) => {
    // console.log(e)
}).catch((error) => {
    // console.log(error)
});


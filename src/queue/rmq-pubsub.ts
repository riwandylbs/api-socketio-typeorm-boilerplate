import * as amqp from 'amqplib';
import { QUEUE_CALLBACK_NAME, RMQ_HOST, RMQ_PASSWORD, RMQ_PORT, RMQ_USERNAME } from "../config";

const CONN_STR = `amqp://${RMQ_USERNAME}:${RMQ_PASSWORD}@${RMQ_HOST}:${RMQ_PORT}`


export const publishToRMQ = async(
    msg,
    queue
) => {
    try {
        const connection = await amqp.connect(CONN_STR);
        const channel = await connection.createChannel();

        // Ensure the queue exists
        await channel.assertQueue(queue, { durable: true });

        // Send message
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
            persistent: true
        });

        // console.log('✅ Message sent:', msg);clear

        // Close connection after short delay
        setTimeout(() => {
            channel.close();
            connection.close();
        }, 500);
        return true;
    } catch (error) {
        console.error('❌ Failed to send message:', error);
        return false;
    }
}

const processQueued = async () => {
    try {
        
        const queue = QUEUE_CALLBACK_NAME;
        const connection = await amqp.connect(CONN_STR); // or user:pass@host

        // Connect to RabbitMQ server
        const channel = await connection.createChannel();

        // Limit unacknowledged messages to 1
        await channel.prefetch(1); // ✅ Key for 1-by-1 processing

        // Assert the queue
        await channel.assertQueue(queue, { durable: true });

        console.log(`Waiting for messages in queue: ${queue}`);

        // Consume messages from the queue
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                try {
                    var message = msg.content.toString();
                    // PROCESS MESSAGE TO SERVICE HERE

                    // Insert the received data using your service function
                    if (true) {
                        // Acknowledge the message
                        channel.ack(msg);
                    } else {
                        // Optionally, send the message to a dead-letter queue or requeue it
                        console.error('Failed to process message:', msg.content.toString());
                        channel.nack(msg, false, false); // false, false means don't requeue
                    }
                } catch (processingError) {
                    console.error('Error processing message:', processingError);
                    channel.nack(msg, false, false); // Optionally, don't requeue
                }
                
            } else {
                console.log('Consumer cancelled by server');
            }
        }, { noAck: false });

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            console.log('Closing consumer...');
            await channel.close();
            await connection.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('Error in consumeRMQMessages:', error);
    }
};

export const consumeRMQMessages = async () => {
    await Promise.all([processQueued()]);
};

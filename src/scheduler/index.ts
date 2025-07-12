const cron = require('node-cron')

export const runScheduler = async() => {
    // Schedule a task to run every minute
    cron.schedule('* * * * *', () => {
        console.log('Running a task every minute for retry callback partner');
        // Place the code you want to run here, e.g., send an email, update a database, etc.
        // getUnfinishTicketWithOPenStatus()
    });
}
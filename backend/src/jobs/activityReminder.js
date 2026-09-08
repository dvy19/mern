const cron = require("node-cron");
const Activity = require("../models/Event");
const Notification = require("../models/notification");

const startActivityReminderJob = () => {

    // Runs every hour
    cron.schedule("0 * * * *", async () => {

        try {
            const now = new Date();

            const activities = await Activity.find({
                reminderAt: { $lte: now },
                reminderSent: false
            });

            for (const activity of activities) {

                await Notification.create({
                    userId: activity.userId,
                    message: "Fill the bowl with fresh water for the birds 🐦",
                    type: "activity-reminder"
                });

                activity.reminderSent = true;
                await activity.save();
            }

            console.log("Activity reminder job executed");

        } catch (error) {
            console.log("Reminder job error:", error);
        }
    });
};

module.exports = startActivityReminderJob;
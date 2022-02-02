import { scheduleJob, scheduledJobs } from "node-schedule";
import sendSMS from "./sendSMS.js";
function remindersScheduler(todos, user) {
  let { taskname, _id, reminders } = todos;
  let { phone, fullname } = user;
  var todoID = _id.toString();
  reminders.forEach((reminder) => {
    scheduleJob(`sms-trigger-${todoID}`, reminder, () => {
      sendSMS(
        phone,
        `Reminder : Hey ${fullname}, Your task ${taskname} is in due.`
      );
      // console.log(phone, `Reminder : Hey ${fullname}, Your task ${taskname} is in due.`);
    });
  });
  // console.log("Active Service workers so far : ", scheduledJobs);
}

export default remindersScheduler;

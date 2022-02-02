import { scheduleJob, scheduledJobs } from "node-schedule";
import sendSMS from "./sendSMS.js";
import remindersScheduler from "./remindersScheduler.js";
function remindersReScheduler(todos, user) {
  let { taskname, _id, reminders } = todos;
  let { phone, fullname } = user;
  let todoID = _id;
  // console.log("Active Service workers before cancel : ", scheduledJobs);
  if (scheduledJobs[`sms-trigger-${todoID}`]) {
    scheduledJobs[`sms-trigger-${todoID}`].cancel();
  }
  // console.log("Active Service workers after cancel : ", scheduledJobs);
  remindersScheduler(todos, user);
  // console.log("Active Service workers after editing : ", scheduledJobs);
}

export default remindersReScheduler;

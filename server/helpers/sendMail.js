import nodemailer from "nodemailer";
import config from "config";

async function sendMail(email, subject, html) {
  let transporter = nodemailer.createTransport({
    host: config.get("emailserver").host,
    port: 465,
    secure: true,
    auth: {
      user: config.get("emailserver").username,
      pass: config.get("emailserver").password,
    },
  });
  let info = await transporter.sendMail({
    from: '"iRhea Solutions " <admin@irhea.in>',
    to: email,
    subject: subject,
    html: html,
  });
  console.log("Message sent: %s", info.messageId);
}

export default sendMail;

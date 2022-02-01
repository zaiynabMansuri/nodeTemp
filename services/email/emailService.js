const nodemailer = require('nodemailer');
const ejs = require('ejs');
const sendMail =  async (obj) => {

  let transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASSWORD
    }
  });
  if (!Array.isArray(obj.to)) {
    obj.to = [obj.to];
  }
  const htmlText = await ejs.renderFile(`${__basedir}${obj.template}/html.ejs`, obj.data);

  let mailOpts = {
    from: obj.from || 'noreply@yoyo.co',
    subject: obj.subject || 'Sample Subject',
    to: obj.to,
    cc: obj.cc || [],
    bcc: obj.bcc || [],
    html: htmlText || '',
    attachments: obj.attachments || []

  };
  return transporter.sendMail(mailOpts);
};

module.exports = { sendMail };

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
  }
});


// Change to POSTMARK email service
exports.handler = async(event, context) => {
  transporter.sendMail({
    from: "Slicks Slices <slick@example.com>",
    to: "orders@example.com",
    subject: "New order!",
    html: `<p> Your new pizza order is here </p>`
  })

  return {
    statusCode: 200,
    body: JSON.stringify(info)
  }
}
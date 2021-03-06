const nodemailer = require('nodemailer');

const generateOrderEmail = ({order, total}) => {
  return `
  <div>
    <h1> Your recent Order for ${total} <h2>
    <p> Please start walking over, we will have your order ready in the next 20 mins. </p>
    <ul>
      ${order.map(item => `<li>
        <img src="${item.thumbnail}" alt"${item.name}" />
        ${item.size} ${item.name} - ${item.price}
      </li>`
      ).join("")}
    </ul>
    <p> Your total is <strong>${total}</strong> due at pickup </p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>
  `
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const wait = (ms = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

exports.handler = async (event, context) => {
  // await wait(5000)
  const body = JSON.parse(event.body)
  console.log(body)

  if(body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop beep bop zzzeet good bye ERROR.'})
    }
  }

  const requiredFields = ['email', 'name', 'order'];

  for(const field of requiredFields) {
    if(!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Oops! You are missing the ${field} field`})
      }
    }
  }

  if(!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Why would you order nothing?!`})
    }
  }

  // Test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({order: body.order, total: body.total}),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success'}),
  };
};
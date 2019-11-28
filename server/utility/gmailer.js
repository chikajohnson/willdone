const nodemailer = require('nodemailer');

module.exports = class Gmailer {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Johnson Iyida <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'sendgrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
      , tls: {
        rejectUnauthorized: false
      }
    });
  }

  // Send the actual email
  async send(subject) {
    // 1) Render HTML based on a pug template
    const html = `<h1>Welcome To schoolTrack</h1>
    <p>Follow the link to complete your registration<br>
    <a href="http://google.com">Click to continue registration<a>
    </p>`

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const response = await this.send("Welcome to SchoolTrack");
    console.log(response);
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};

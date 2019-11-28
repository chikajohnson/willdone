const nodeMailer = require('nodemailer');

exports.sendMail = function (req, res) {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  //true for 465 port, false for other ports
    auth: {
      user: 'chikajohnson@gmail.com',
      pass: 'Chikodili2!'
    },

  });
  const mailOptions = {
    from: '"School Track" <schooltrack@yahoo.com>', // sender address
    to: 'tarboshi@yahoo.com', // list of receivers
    subject: 'School Track Onbaording ', // Subject lines
    text: 'School Track Onbaording was successful, go to http://schooltrack.com/login to login and complete the registration', // plain text body
    html: '<b>School Track Onbaording was successful, go to http://schooltrack.com/login to login and complete the registration</b>' // html body
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {        
        throw new Error(error);
      } else {
        console.log(info);
      }
    });
  } catch (error) {
    console.log("email error", error);
  }


}
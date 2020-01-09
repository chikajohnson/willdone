const sgMail = require('@sendgrid/mail');

sgMail.setApiKey("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");

async function  sendActivationToken (email, name, link){
  sgMail.send({
    to: email,
    from: "chikajohnson@gmail.com",
    subject: "Willdone Account Activation :happy",
    text: 'Activate your account ',
    html: `
    <h3>Account verification Process.</h3>
  
    <p>
    ${name}, Thanks for registering with willdone.com<br>
     To complete the registration, click on the link below to activate your account.<br>
    </p>
    <br/>
    <a href="${link}">Click to activate</a>
    `
  });
}

module.exports = {
  sendActivationToken
};


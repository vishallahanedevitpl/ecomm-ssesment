const nodemailer = require("nodemailer");
const { genrateEmailVerificationToken } = require("./generateToken");

const sendAccountVerificationMail = async (emailId) => {
  const token = await genrateEmailVerificationToken(emailId);

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: "devitpl@gmail.com",

    to: emailId,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           ${process.env.SERVER_URL}/user/verifyEmail/${token} 
           Thanks`,
  };
  try {
    transport.sendMail(mailConfigurations, function (error, info) {
      //   if (error) throw Error(error);
      console.log("Email Sent Successfully");
      console.log(info);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendPasswordResetLink = async (emailId, link) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: "devitpl@gmail.com",

    to: emailId,

    // Subject of Email
    subject: "Password rest",

    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to reset your password
           ${link} 
           Thanks`,
  };
  try {
    transport.sendMail(mailConfigurations, function (error, info) {
      //   if (error) throw Error(error);
      console.log("Email Sent Successfully");
      console.log(info);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { sendAccountVerificationMail, sendPasswordResetLink };

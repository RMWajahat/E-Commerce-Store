const mailer = require('nodemailer');

const sendEmail = async (options) => {
    console.log(`Sending email ${process.env.EMAIL_SERVICE}\n${process.env.EMAIL_SENDER}\n${process.env.EMAIL_PASSWORD}`);
    const transporter = mailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailerOptions = {
        from: process.env.EMAIL_SENDER,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailerOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
}

module.exports = sendEmail;
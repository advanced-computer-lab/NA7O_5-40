const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'flightguc@hotmail.com',
        pass: 'Qwerty2021'
    }
});

const sendMail = async (emailAddress, subject, message) => {
    try {
        let info = await transporter.sendMail({
            from: 'flightguc@hotmail.com', // sender address
            to: emailAddress, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        return 'message sent';
        
    } catch (e) {
        return e.message;
    }
}
module.exports = sendMail;

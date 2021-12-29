const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'gucairways@outlook.com',
        pass: 'Qwerty2021'
    }
});

const sendMail = async (emailAddress, subject, message) => {
    
    try {
        let info = await transporter.sendMail({
            from: 'gucairways@outlook.com', // sender address
            to: emailAddress, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });

        console.log(info)
        return true;
        
    } catch (e) {
       console.log(e);
        return e.message;
        
    }
}
module.exports = sendMail;

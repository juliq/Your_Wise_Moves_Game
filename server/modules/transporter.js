const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'yourwisemovesdev',
        pass: 'abcde12345abcde12345' //a throwaway gmail account we can change for production
    }
});

module.exports = transporter;

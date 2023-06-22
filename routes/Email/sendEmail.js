const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '09shlok1999ae1@gmail.com',
        pass: 'Dollar@1999'
    }
});

let mailOptions = {
    from: '09shlok1999ae1@gmail.com',
    to: 'shloksrivastava577@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

module.exports = transporter;

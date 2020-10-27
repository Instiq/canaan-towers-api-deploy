const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, firstname) => {
    sgMail.send({
        to: email,
        from: 'adududuke@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to Canaan Towers, ${firstname}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, firstname) => {
    sgMail.send({
        to: email,
        from: 'adududuke@gmail.com',
        subject: 'Sad to see you go!',
        text: `Goodbye, ${firstname}. I hope to see you back sometime soon.`
    })
}

module.exports = { sendWelcomeEmail, sendCancelationEmail }
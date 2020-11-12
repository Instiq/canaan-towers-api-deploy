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

const notifyCustomerQuoteSent = (email, name) => {
    sgMail.send({
        to: email,
        from: 'adududuke@gmail.com',
        subject: 'Canaan Towers - Quotes sent in! 🎉',
        text: `Welcome to Canaan Towers, ${name}. Thanks for patronizing Canaan Towers. Your quote has been sent in. We will get back to you shortly.
        
        
Cheers,
Blessed Adudu.`
    })
}

const notifyAdminQuoteSent = (name) => {
    sgMail.send({
        to: 'adududuke@yahoo.com',
        from: 'adududuke@gmail.com',
        subject: 'Canaan Towers - New Quote sent in! 🎉',
        text: `Hello, Admin. Your attention is needed. A new quote has been sent in by ${name}. Please check your dashboard https://www.google.com/ for further details.`
    })
}

module.exports = { sendWelcomeEmail, sendCancelationEmail, notifyCustomerQuoteSent, notifyAdminQuoteSent }
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },
})

function sendEmail(options) {
    const to = options.to
    const subject = options.subject
    const message = options.message

    const messageHtml = message.replaceAll("\n", "<br/>")

    return transporter.sendMail({
            from: '"Rouz" <morouzx@gmail.com>',
            to,
            subject,
            text: message,
            html: messageHtml,
        }).then((sentMessageInfo) => {
            const wasSentSuccesssFully = sentMessageInfo.accepted.includes(to)
            if(wasSentSuccesssFully) {
                console.log("E-Mail was sent to", to)
                return true
            } else {
                console.log("E-Mail was rejected by", to)
                return false
            }
        }).catch((err) => {
            console.log("Error sending Email", err)
            return err
        })
}

module.exports = sendEmail
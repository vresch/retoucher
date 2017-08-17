var MailGun = require('mailgun-es6')

var mailGun = new MailGun({
  privateApi: 'key-a71e39570d5f292cc0931ba48d4d75a7',
  domainName: 'sandbox1209c8e5eede48ed9bc479c429e821c6.mailgun.org'
})

var mail = {
  sendMail: function (data) {
    var email = data.email
    var text = 'From: ' + data.name + '. Phone: ' + data.phone + '\nMessage: ' + data.message
    return mailGun.sendEmail({
      to: ['olha.grebennikova@gmail.com'],
      cc: ['max.vresch@gmail.com'],
      from: email,
      subject: '[grebol.ga] New enquiry',
      text: text
    })
  }
}

module.exports = mail

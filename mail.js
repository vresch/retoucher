var MailGun = require('mailgun-es6')

var mailGun = new MailGun({
  privateApi: 'key-a71e39570d5f292cc0931ba48d4d75a7',
  domainName: 'sandbox1209c8e5eede48ed9bc479c429e821c6.mailgun.org'
})

var mail = {
  sendMail: function (data) {
    var email = data.email
    var message = 'From: ' + data.name + '. Phone: ' + data.phone + '\nMessage: ' + data.text
    return mailGun.sendEmail({
      to: ['max.vresch@gmail.com', 'olha.grebennikova@gmail.com'],
      from: email,
      subject: 'New enquiry from grebol.ga',
      text: message
    })
  }
}

module.exports = mail

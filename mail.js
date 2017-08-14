var MailGun = require('mailgun-es6')

var mailGun = new MailGun({
  privateApi: 'key-a71e39570d5f292cc0931ba48d4d75a7',
  domainName: 'sandbox1209c8e5eede48ed9bc479c429e821c6.mailgun.org'
})

var mail = {
  sendMail: function (data) {
    var from = data.name + ' <' + data.email + '>'
    var text = 'Name: ' + data.name + '. Phone: ' + data.phone + '\nMessage: \n' + data.message
    return mailGun.sendEmail({
      to: 'olha.grebennikova@gmail.com',
      cc: 'max.vresch@gmail.com',
      from: from,
      subject: '[grebol.ga] New enquiry',
      text: text
    })
  }
}

module.exports = mail

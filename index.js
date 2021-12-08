const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cron = require("node-cron");
const express = require("express");
const app = express();

app.use(express.json());

dotenv.config();

const mailOptions = {
	from: process.env.EMAIL_FROM,
	to: "ariqshd@salmanitb.com",
	subject: "Kue untukmu Aktivis Salman Penggerak Peradaban",
	html: "<h1>That was easy!</h1><p>kan ku</p>",
};

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_FROM,
		pass: process.env.EMAIL_PASSWORD,
	},
});

let emailData = ["ariqshd@salmanitb.com", "invanteris@gmail.com"];

let emailPromiseArray = [];

cron.schedule("1 * * * * *", () => {
	for (let i = 0; i < emailData.length; i++) {
		emailPromiseArray.push(
			transporter.sendMail(
				{
					from: process.env.EMAIL_FROM,
					to: emailData[i],
					subject: "Kue untukmu Aktivis Salman Penggerak Peradaban",
					html: "<h1>That was easy!</h1><p>kan ku</p>",
				},
				function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log("Email sent: " + info.response);
					}
				}
			)
		);
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

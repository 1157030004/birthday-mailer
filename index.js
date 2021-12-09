const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cron = require("node-cron");
const express = require("express");
require("./config/db");
dotenv.config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_FROM,
		pass: process.env.EMAIL_PASSWORD,
	},
});

let emailData = ["mhasan@salmanitb.com", "invanteris@gmail.com"];

let emailPromiseArray = [];

cron.schedule("* 6 * * *", () => {
	for (let i = 0; i < emailData.length; i++) {
		emailPromiseArray.push(
			transporter.sendMail(
				{
					from: process.env.EMAIL_FROM,
					to: emailData[i],
					subject: "Kue untukmu Aktivis Salman Penggerak Peradaban",
					html: "<h1>Semoga bisa menjadi anak buahnya Pak Yaqut</h1><p>Hasan</p>",
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

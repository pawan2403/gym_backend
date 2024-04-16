const nodemailer = require('nodemailer');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class Nodemailer {
    constructor() {
        
     }

    // this.sendVerifyMail = async (email)=>{
    async sendVerifyMail(data) {
        try {
            const token = jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: '24h' })
            console.log('nodetokennnnnn==>>',token)
            const transpoter = nodemailer.createTransport({
                // host:'smtp.gmail.com',
                // port:587,
                // secure:false,
                // requireTLS:true,
                service: 'Gmail',
                auth: {
                    user: "hellopawankumar24@gmail.com",
                    pass: "dbvczqvukiyydpym"

                }
            });
            const mailOption = {
                from: 'hellopawankumar24@gmail.com',
                to: data.email,
                subject: 'For Verification Mail',
                // html:`<p>Hii, Please click here to <a href='http://localhost:4200/email-verification${token}'>Verify</p>`
                text: `Go to this link for confirmation of your registration'+ http://localhost:4200/email-verification?token=${token}`
            }
            transpoter.sendMail(mailOption, function (error, info) {
                if (error) {
                    console.log('error', error)
                }
                else {
                    console.log('Email has been send :-', info.response)
                }
            })

        } catch (error) {
            console.log('catch error', error)
        }
    }
}

module.exports = Nodemailer;


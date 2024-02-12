'use strict';
const axios = require('axios');
const nodemailer = require("nodemailer");
const config = require('./../../config/config');
const { ERR } = require('./../../utils/constants');
const controller = require('./../../api/pages/controller');

const transporter = nodemailer.createTransport({
  host: "outlook.office365.com",
  port: 587,
  secure: true,
  auth: {
    user: config.SEND_EMAIL.USER,
    pass: config.SEND_EMAIL.PASSWORD
  },
})
module.exports = {
  async getBackup(){
    let result;
    try {
      const url = config.BASE.URL;
      const userID = config.AUTH.USER;
      const auth_url = config.AUTH.URL;
      const password = config.AUTH.PASSWORD;
  
      const authResponse = await axios.post(auth_url, {userID, password});
      const token = authResponse.data.access_token;

      await axios.get(url, {headers: { Authorization: 'Bearer '+token }})
      .then(async (item) => {
        result = await controller.saveBackup(item.data);
      })
    } catch (err) {
      console.err(err.message);
      result = ERR.INTERNAL_ERROR;
    } finally {
      return result;
    };
  }, 

  async sendEmail() {
    try {
      await transporter.sendMail({
        from: config.SEND_EMAIL.USER,
        to: "devjose072@gmail.com",
        subject: "Hello ✔", 
        text: "Backup copy has been saved. 😉"
      });
    } catch(e){
      console.log(e.message);
    }
    
  }
};
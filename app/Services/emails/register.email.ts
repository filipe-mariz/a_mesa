import Env from '@ioc:Adonis/Core/Env';
import Mails from '../../../config/mail'
import * as nodemailer from "nodemailer";

export default class RegisterEmail {
  public async registerEmail(email) {
    const destination = email
    const emailSender = Env.get('MAIL')

    let mailOptions = {
      from: emailSender,
      to: destination,
      subject: "Seja Bem vindo à mesa",
      html: `Você se cadastrou na Mesa! Seja Muito bem vindo`
    };

    const transporter = nodemailer.createTransport({
      host: Mails.host,
      port: Mails.port,
      secure: false,
      auth: {
        user: Mails.user,
        pass: Mails.password
      },
      tls: { rejectUnauthorized: false }
    });

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return error;
      } else {
        return "E-mail enviado com sucesso!";
      }
    });

  }

}

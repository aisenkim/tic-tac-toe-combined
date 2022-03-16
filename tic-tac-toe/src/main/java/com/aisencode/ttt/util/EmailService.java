package com.aisencode.ttt.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailService {

   @Autowired
   private JavaMailSender emailSender;

   public void sendVerificationMail(String to, String subject, String text) {
       SimpleMailMessage mail = new SimpleMailMessage();
       mail.setFrom("noreply@aisencode.com");
       mail.setTo(to);
       mail.setSubject(subject);
       mail.setText(text);
       emailSender.send(mail);
   }

}

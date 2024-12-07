//package com.example.demo.service;
//
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//
//import javax.mail.MessagingException;
//import javax.mail.internet.MimeMessage;
//
//@Service
//public class EmailService {
//
//    private final JavaMailSender javaMailSender;
//
//    public EmailService(JavaMailSender javaMailSender) {
//        this.javaMailSender = javaMailSender;
//    }
//
//    public void sendEmail(String name, String email, String message) throws MessagingException {
//        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
//
//        helper.setFrom(email);
//        helper.setTo("support@edugrade.com");
//        helper.setSubject("New Contact Form Message");
//        helper.setText(String.format("Name: %s\nEmail: %s\nMessage: %s", name, email, message));
//
//        javaMailSender.send(mimeMessage);
//    }
//}

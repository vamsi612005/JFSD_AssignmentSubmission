//package com.example.demo.controller;
//
//import com.example.demo.DTO.ContactForm;
//import com.example.demo.service.EmailService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.mail.MessagingException;
//
//@RestController
//@RequestMapping("/api/contact")
//@CrossOrigin(origins = "http://localhost:3000") // Allow cross-origin requests from the React app
//public class ContactController {
//
//    private final EmailService emailService;
//
//    public ContactController(EmailService emailService) {
//        this.emailService = emailService;
//    }
//
//    @PostMapping
//    public ResponseEntity<String> sendContactForm(@RequestBody ContactForm contactForm) {
//        try {
//            emailService.sendEmail(contactForm.getName(), contactForm.getEmail(), contactForm.getMessage());
//            return ResponseEntity.ok("Message sent successfully!");
//        } catch (MessagingException e) {
//            return ResponseEntity.status(500).body("There was an error sending your message.");
//        }
//    }
//}

package com.contactform.service;


import com.contactform.Model.Contact;
import com.contactform.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
// import org.springframework.mail.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ContactRepository contactRepository;

    @Transactional
    public void saveContact(Contact contact) {
        // Save to the database
        contactRepository.save(contact);
        System.out.println("Saved contact: " + contact);

        // Send email notification
        sendEmail(contact);
    }

    private void sendEmail(Contact contact) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo("zainuuansari@gmail.com");  // Change this to your email
            helper.setSubject("New Contact Form Submission");
            helper.setText("You have received a new message from " + contact.getName() +
                           " (" + contact.getEmail() + "):\n\n" + contact.getMessage(), true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

package com.contactform.controller;


import com.contactform.Model.Contact;
import com.contactform.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public String submitContactForm(@RequestBody Contact contact) {
        contactService.saveContact(contact);
        return "Contact form submitted successfully!";
    }
}

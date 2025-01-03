package com.contactform.repository;


import com.contactform.Model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    // Custom query methods can be added here if needed
}

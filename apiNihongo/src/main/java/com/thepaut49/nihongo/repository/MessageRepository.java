package com.thepaut49.nihongo.repository;

import com.thepaut49.nihongo.model.Message;
import com.thepaut49.nihongo.model.Particule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface MessageRepository extends JpaRepository<Message, Long> {

	long countByDateCreation(LocalDate dateCreation);

}

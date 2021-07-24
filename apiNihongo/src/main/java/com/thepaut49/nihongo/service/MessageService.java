package com.thepaut49.nihongo.service;

import com.thepaut49.nihongo.exception.ResourceAlreadyExistException;
import com.thepaut49.nihongo.model.Message;
import com.thepaut49.nihongo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MessageService {

	@Autowired
	private MessageRepository MessageRepository;
	
	public Message createMessage(Message newMessage) {
		LocalDate today = LocalDate.now();
		long dailyMessageQuota = 10;
		if (MessageRepository.countByDateCreation(today) < dailyMessageQuota) {
			newMessage.setDateCreation(today);
			return MessageRepository.save(newMessage);
		}
		else {
			throw new ResourceAlreadyExistException("Daily messages quota already reached !");
		}
	}

	public void delete(Long id) {
		Optional<Message> Message = MessageRepository.findById(id);
		if (!Message.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Message with id : " + id );
		}
		MessageRepository.deleteById(id);
	}

	public Message findById(Long id) {
		Optional<Message> Message = MessageRepository.findById(id);
		if (!Message.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Message with id : " + id );
		}
		return Message.get();
	}
	
	public List<Message> findAll() {
		return MessageRepository.findAll();
	}
}

package com.thepaut49.nihongo.controller;

import com.thepaut49.nihongo.dto.MessageDTO;
import com.thepaut49.nihongo.mapper.MessageToDTOMapper;
import com.thepaut49.nihongo.model.Message;
import com.thepaut49.nihongo.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://HOST_NAME:FRONT_PORT", maxAge = 3600)
@RestController
@RequestMapping("/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@PostMapping("/create")
	public MessageDTO createMessage( @RequestBody MessageDTO messageDTO) {
		Message newMessage = MessageToDTOMapper.map(messageDTO);
		return MessageToDTOMapper.map(messageService.createMessage(newMessage));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(value = "/{id}")
	public String delete(@PathVariable Long id) {
		messageService.delete(id);
		return "Message deleted !";
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(value = "/{id}")
	public MessageDTO findById( @PathVariable Long id) {
		return MessageToDTOMapper.map(messageService.findById(id));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/all")
	public List<MessageDTO> getAllMessages() {
		List<Message> messages = messageService.findAll();
		return messages
				.stream()
				.map(message -> MessageToDTOMapper.map(message))
				.collect(Collectors.toList());
	}
}
















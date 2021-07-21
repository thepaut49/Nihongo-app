package com.thepaut49.nihongo.mapper;

import com.thepaut49.nihongo.dto.MessageDTO;
import com.thepaut49.nihongo.model.Message;

public class MessageToDTOMapper {
	
	public static MessageDTO map(Message message) {
		MessageDTO messageDTO = new MessageDTO();
		messageDTO.setId(message.getId());
		messageDTO.setTitle(message.getTitle());
		messageDTO.setEmail(message.getEmail());
		messageDTO.setContent(message.getContent());
		messageDTO.setDateCreation(message.getDateCreation());
		messageDTO.setVersion(message.getVersion());
		return messageDTO;
	}
	
	public static Message map(MessageDTO messageDTO) {
		Message message = new Message();
		message.setId(messageDTO.getId());
		message.setTitle(messageDTO.getTitle());
		message.setEmail(messageDTO.getEmail());
		message.setContent(messageDTO.getContent());
		message.setDateCreation(messageDTO.getDateCreation());
		message.setVersion(messageDTO.getVersion());
		return message;
	}

}

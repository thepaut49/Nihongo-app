package com.thepaut49.nihongo.mapper;

import java.util.HashSet;

import com.thepaut49.nihongo.dto.CounterDTO;
import com.thepaut49.nihongo.model.Counter;

public class CounterToDTOMapper {
	
	public static CounterDTO map(Counter counter) {
		CounterDTO counterDTO = new CounterDTO();
		counterDTO.setId(counter.getId());
		counterDTO.setKanjis(counter.getKanjis());
		counterDTO.setVersion(counter.getVersion());
		counterDTO.setNumberOfUse(counter.getNumberOfUse());
		counterDTO.setPronunciation(new HashSet<String>());
		String[] pronunciations = counter.getPronunciation().split(";");
		for(int index = 0; index < pronunciations.length; index++) {
			counterDTO.getPronunciation().add(pronunciations[index].replace(";", ""));	
		}
		counterDTO.setUse(counter.getUse());
		counterDTO.setSummary(counter.getSummary());
		return counterDTO;
	}
	
	public static Counter map(CounterDTO counterDTO) {
		Counter counter = new Counter();
		counter.setId(counterDTO.getId());
		counter.setKanjis(counterDTO.getKanjis());
		counter.setVersion(counterDTO.getVersion());
		counter.setNumberOfUse(counterDTO.getNumberOfUse());
		String pronunciationTemp = "";
		for(String pronunciation : counterDTO.getPronunciation()) {
			pronunciationTemp += pronunciation + ";";	
		}
		counter.setPronunciation(pronunciationTemp);
		counter.setUse(counterDTO.getUse());
		counter.setSummary(counterDTO.getSummary());
		return counter;
	}

}

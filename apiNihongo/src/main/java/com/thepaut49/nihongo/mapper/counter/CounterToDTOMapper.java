package com.thepaut49.nihongo.mapper.counter;

import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.counter.CounterDTO;
import com.thepaut49.nihongo.dto.counter.CounterPronunciationDTO;
import com.thepaut49.nihongo.model.counter.Counter;
import com.thepaut49.nihongo.model.counter.CounterPronunciation;

public class CounterToDTOMapper {
	
	public static CounterDTO map(Counter counter) {
		CounterDTO counterDTO = new CounterDTO();
		counterDTO.setId(counter.getId());
		counterDTO.setKanjis(counter.getKanjis());
		counterDTO.setVersion(counter.getVersion());
		counterDTO.setNumberOfUse(counter.getNumberOfUse());
		Set<CounterPronunciationDTO> pronunciationsTemp = counter.getPronunciations().stream().map(tempCounter -> CounterPronunciationToDTOMapper.map(tempCounter)).collect(Collectors.toSet());
		counterDTO.setPronunciations(pronunciationsTemp);
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
		Set<CounterPronunciation> pronunciationsTemp = counterDTO.getPronunciations().stream().map(tempCounter -> CounterPronunciationToDTOMapper.map(tempCounter)).collect(Collectors.toSet());
		counter.setPronunciations(pronunciationsTemp);
		counter.setUse(counterDTO.getUse());
		counter.setSummary(counterDTO.getSummary());
		return counter;
	}

}

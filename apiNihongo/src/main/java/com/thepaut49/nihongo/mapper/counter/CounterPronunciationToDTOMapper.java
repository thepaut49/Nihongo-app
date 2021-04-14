package com.thepaut49.nihongo.mapper.counter;

import com.thepaut49.nihongo.dto.counter.CounterPronunciationDTO;
import com.thepaut49.nihongo.model.counter.CounterPronunciation;


public class CounterPronunciationToDTOMapper {
	
	public static CounterPronunciationDTO map(CounterPronunciation counterPronunciation) {
		CounterPronunciationDTO counterPronunciationDTO = new CounterPronunciationDTO();
		counterPronunciationDTO.setId(counterPronunciation.getId());
		counterPronunciationDTO.setPronunciationNumber(counterPronunciation.getPronunciationNumber());
		counterPronunciationDTO.setVersion(counterPronunciation.getVersion());
		counterPronunciationDTO.setPronunciation(counterPronunciation.getPronunciation());
		return counterPronunciationDTO;
	}
	
	public static CounterPronunciation map(CounterPronunciationDTO counterPronunciationDTO) {
		CounterPronunciation counterPronunciation = new CounterPronunciation();
		counterPronunciation.setId(counterPronunciationDTO.getId());
		counterPronunciation.setPronunciationNumber(counterPronunciationDTO.getPronunciationNumber());
		counterPronunciation.setVersion(counterPronunciationDTO.getVersion());
		counterPronunciation.setPronunciation(counterPronunciationDTO.getPronunciation());
		return counterPronunciation;
	}

}

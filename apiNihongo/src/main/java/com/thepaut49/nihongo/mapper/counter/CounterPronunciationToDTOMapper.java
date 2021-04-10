package com.thepaut49.nihongo.mapper.counter;

import com.thepaut49.nihongo.dto.counter.CounterPronunciationDTO;
import com.thepaut49.nihongo.model.counter.CounterPronunciation;


public class CounterPronunciationToDTOMapper {
	
	public static CounterPronunciationDTO map(CounterPronunciation counterPronunciation) {
		CounterPronunciationDTO counterPronunciationDTO = new CounterPronunciationDTO();
		counterPronunciationDTO.setCounterId(counterPronunciation.getCounterId());
		counterPronunciationDTO.setPronunciationNumber(counterPronunciation.getPronunciationNumber());
		counterPronunciationDTO.setVersion(counterPronunciation.getVersion());
		counterPronunciationDTO.setPronunciation(counterPronunciation.getPronunciation());
		return counterPronunciationDTO;
	}
	
	public static CounterPronunciation map(CounterPronunciationDTO counterPronunciationDTO) {
		CounterPronunciation counterPronunciation = new CounterPronunciation();
		counterPronunciation.setCounterId(counterPronunciationDTO.getCounterId());
		counterPronunciation.setPronunciationNumber(counterPronunciationDTO.getPronunciationNumber());
		counterPronunciation.setVersion(counterPronunciationDTO.getVersion());
		counterPronunciation.setPronunciation(counterPronunciationDTO.getPronunciation());
		return counterPronunciation;
	}

}

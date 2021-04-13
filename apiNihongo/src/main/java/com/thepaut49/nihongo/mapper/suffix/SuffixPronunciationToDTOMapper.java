package com.thepaut49.nihongo.mapper.suffix;

import com.thepaut49.nihongo.dto.suffix.SuffixPronunciationDTO;
import com.thepaut49.nihongo.model.suffix.SuffixPronunciation;


public class SuffixPronunciationToDTOMapper {
	
	public static SuffixPronunciationDTO map(SuffixPronunciation suffixPronunciation) {
		SuffixPronunciationDTO suffixPronunciationDTO = new SuffixPronunciationDTO();
		suffixPronunciationDTO.setSuffixId(suffixPronunciation.getSuffixId());
		suffixPronunciationDTO.setPronunciationNumber(suffixPronunciation.getPronunciationNumber());
		suffixPronunciationDTO.setVersion(suffixPronunciation.getVersion());
		suffixPronunciationDTO.setPronunciation(suffixPronunciation.getPronunciation());
		return suffixPronunciationDTO;
	}
	
	public static SuffixPronunciation map(SuffixPronunciationDTO suffixPronunciationDTO) {
		SuffixPronunciation suffixPronunciation = new SuffixPronunciation();
		suffixPronunciation.setSuffixId(suffixPronunciationDTO.getSuffixId());
		suffixPronunciation.setPronunciationNumber(suffixPronunciationDTO.getPronunciationNumber());
		suffixPronunciation.setVersion(suffixPronunciationDTO.getVersion());
		suffixPronunciation.setPronunciation(suffixPronunciationDTO.getPronunciation());
		return suffixPronunciation;
	}

}

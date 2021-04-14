package com.thepaut49.nihongo.mapper.name;

import com.thepaut49.nihongo.dto.name.NamePronunciationDTO;
import com.thepaut49.nihongo.model.name.NamePronunciation;


public class NamePronunciationToDTOMapper {
	
	public static NamePronunciationDTO map(NamePronunciation namePronunciation) {
		NamePronunciationDTO namePronunciationDTO = new NamePronunciationDTO();
		namePronunciationDTO.setId(namePronunciation.getId());
		namePronunciationDTO.setPronunciationNumber(namePronunciation.getPronunciationNumber());
		namePronunciationDTO.setVersion(namePronunciation.getVersion());
		namePronunciationDTO.setPronunciation(namePronunciation.getPronunciation());
		return namePronunciationDTO;
	}
	
	public static NamePronunciation map(NamePronunciationDTO namePronunciationDTO) {
		NamePronunciation namePronunciation = new NamePronunciation();
		namePronunciation.setId(namePronunciationDTO.getId());
		namePronunciation.setPronunciationNumber(namePronunciationDTO.getPronunciationNumber());
		namePronunciation.setVersion(namePronunciationDTO.getVersion());
		namePronunciation.setPronunciation(namePronunciationDTO.getPronunciation());
		return namePronunciation;
	}

}

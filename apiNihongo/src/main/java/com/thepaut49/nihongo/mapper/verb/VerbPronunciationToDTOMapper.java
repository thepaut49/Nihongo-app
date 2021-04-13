package com.thepaut49.nihongo.mapper.verb;

import com.thepaut49.nihongo.dto.verb.VerbPronunciationDTO;
import com.thepaut49.nihongo.model.verb.VerbPronunciation;


public class VerbPronunciationToDTOMapper {
	
	public static VerbPronunciationDTO map(VerbPronunciation verbPronunciation) {
		VerbPronunciationDTO verbPronunciationDTO = new VerbPronunciationDTO();
		verbPronunciationDTO.setId(verbPronunciation.getId());
		verbPronunciationDTO.setPronunciationNumber(verbPronunciation.getPronunciationNumber());
		verbPronunciationDTO.setVersion(verbPronunciation.getVersion());
		verbPronunciationDTO.setPronunciation(verbPronunciation.getPronunciation());
		return verbPronunciationDTO;
	}
	
	public static VerbPronunciation map(VerbPronunciationDTO verbPronunciationDTO) {
		VerbPronunciation verbPronunciation = new VerbPronunciation();
		verbPronunciation.setId(verbPronunciationDTO.getId());
		verbPronunciation.setPronunciationNumber(verbPronunciationDTO.getPronunciationNumber());
		verbPronunciation.setVersion(verbPronunciationDTO.getVersion());
		verbPronunciation.setPronunciation(verbPronunciationDTO.getPronunciation());
		return verbPronunciation;
	}

}

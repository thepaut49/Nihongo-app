package com.thepaut49.nihongo.mapper.naadjective;

import com.thepaut49.nihongo.dto.naadjective.NaAdjectivePronunciationDTO;
import com.thepaut49.nihongo.model.naadjective.NaAdjectivePronunciation;


public class NaAdjectivePronunciationToDTOMapper {
	
	public static NaAdjectivePronunciationDTO map(NaAdjectivePronunciation naAdjectivePronunciation) {
		NaAdjectivePronunciationDTO naAdjectivePronunciationDTO = new NaAdjectivePronunciationDTO();
		naAdjectivePronunciationDTO.setId(naAdjectivePronunciation.getId());
		naAdjectivePronunciationDTO.setPronunciationNumber(naAdjectivePronunciation.getPronunciationNumber());
		naAdjectivePronunciationDTO.setVersion(naAdjectivePronunciation.getVersion());
		naAdjectivePronunciationDTO.setPronunciation(naAdjectivePronunciation.getPronunciation());
		return naAdjectivePronunciationDTO;
	}
	
	public static NaAdjectivePronunciation map(NaAdjectivePronunciationDTO naAdjectivePronunciationDTO) {
		NaAdjectivePronunciation naAdjectivePronunciation = new NaAdjectivePronunciation();
		naAdjectivePronunciation.setId(naAdjectivePronunciationDTO.getId());
		naAdjectivePronunciation.setPronunciationNumber(naAdjectivePronunciationDTO.getPronunciationNumber());
		naAdjectivePronunciation.setVersion(naAdjectivePronunciationDTO.getVersion());
		naAdjectivePronunciation.setPronunciation(naAdjectivePronunciationDTO.getPronunciation());
		return naAdjectivePronunciation;
	}

}

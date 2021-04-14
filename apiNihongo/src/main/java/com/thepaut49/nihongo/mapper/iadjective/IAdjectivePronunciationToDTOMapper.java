package com.thepaut49.nihongo.mapper.iadjective;

import com.thepaut49.nihongo.dto.iadjective.IAdjectivePronunciationDTO;
import com.thepaut49.nihongo.model.iadjective.IAdjectivePronunciation;


public class IAdjectivePronunciationToDTOMapper {
	
	public static IAdjectivePronunciationDTO map(IAdjectivePronunciation iAdjectivePronunciation) {
		IAdjectivePronunciationDTO iAdjectivePronunciationDTO = new IAdjectivePronunciationDTO();
		iAdjectivePronunciationDTO.setId(iAdjectivePronunciation.getId());
		iAdjectivePronunciationDTO.setPronunciationNumber(iAdjectivePronunciation.getPronunciationNumber());
		iAdjectivePronunciationDTO.setVersion(iAdjectivePronunciation.getVersion());
		iAdjectivePronunciationDTO.setPronunciation(iAdjectivePronunciation.getPronunciation());
		return iAdjectivePronunciationDTO;
	}
	
	public static IAdjectivePronunciation map(IAdjectivePronunciationDTO iAdjectivePronunciationDTO) {
		IAdjectivePronunciation iAdjectivePronunciation = new IAdjectivePronunciation();
		iAdjectivePronunciation.setId(iAdjectivePronunciationDTO.getId());
		iAdjectivePronunciation.setPronunciationNumber(iAdjectivePronunciationDTO.getPronunciationNumber());
		iAdjectivePronunciation.setVersion(iAdjectivePronunciationDTO.getVersion());
		iAdjectivePronunciation.setPronunciation(iAdjectivePronunciationDTO.getPronunciation());
		return iAdjectivePronunciation;
	}

}

package com.thepaut49.nihongo.mapper;

import com.thepaut49.nihongo.dto.VerbMeaningDTO;
import com.thepaut49.nihongo.model.VerbMeaning;


public class VerbMeaningToDTOMapper {
	
	public static VerbMeaningDTO map(VerbMeaning verbMeaning) {
		VerbMeaningDTO verbMeaningDTO = new VerbMeaningDTO();
		verbMeaningDTO.setVerbId(verbMeaning.getVerbId());
		verbMeaningDTO.setMeaningNumber(verbMeaning.getMeaningNumber());
		verbMeaningDTO.setVersion(verbMeaning.getVersion());
		verbMeaningDTO.setMeaning(verbMeaning.getMeaning());
		return verbMeaningDTO;
	}
	
	public static VerbMeaning map(VerbMeaningDTO verbMeaningDTO) {
		VerbMeaning verbMeaning = new VerbMeaning();
		verbMeaning.setVerbId(verbMeaningDTO.getVerbId());
		verbMeaning.setMeaningNumber(verbMeaningDTO.getMeaningNumber());
		verbMeaning.setVersion(verbMeaningDTO.getVersion());
		verbMeaning.setMeaning(verbMeaningDTO.getMeaning());
		return verbMeaning;
	}

}

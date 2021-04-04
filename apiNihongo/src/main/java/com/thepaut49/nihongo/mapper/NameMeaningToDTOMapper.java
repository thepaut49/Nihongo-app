package com.thepaut49.nihongo.mapper;

import com.thepaut49.nihongo.dto.NameMeaningDTO;
import com.thepaut49.nihongo.model.NameMeaning;


public class NameMeaningToDTOMapper {
	
	public static NameMeaningDTO map(NameMeaning nameMeaning) {
		NameMeaningDTO nameMeaningDTO = new NameMeaningDTO();
		nameMeaningDTO.setId(nameMeaning.getId());
		nameMeaningDTO.setMeaningNumber(nameMeaning.getMeaningNumber());
		nameMeaningDTO.setVersion(nameMeaning.getVersion());
		nameMeaningDTO.setMeaning(nameMeaning.getMeaning());
		return nameMeaningDTO;
	}
	
	public static NameMeaning map(NameMeaningDTO nameMeaningDTO) {
		NameMeaning nameMeaning = new NameMeaning();
		nameMeaning.setId(nameMeaningDTO.getId());
		nameMeaning.setMeaningNumber(nameMeaningDTO.getMeaningNumber());
		nameMeaning.setVersion(nameMeaningDTO.getVersion());
		nameMeaning.setMeaning(nameMeaningDTO.getMeaning());
		return nameMeaning;
	}

}

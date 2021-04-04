package com.thepaut49.nihongo.mapper;

import com.thepaut49.nihongo.dto.NaAdjectiveMeaningDTO;
import com.thepaut49.nihongo.model.NaAdjectiveMeaning;


public class NaAdjectiveMeaningToDTOMapper {
	
	public static NaAdjectiveMeaningDTO map(NaAdjectiveMeaning naAdjectiveMeaning) {
		NaAdjectiveMeaningDTO naAdjectiveMeaningDTO = new NaAdjectiveMeaningDTO();
		naAdjectiveMeaningDTO.setId(naAdjectiveMeaning.getId());
		naAdjectiveMeaningDTO.setMeaningNumber(naAdjectiveMeaning.getMeaningNumber());
		naAdjectiveMeaningDTO.setVersion(naAdjectiveMeaning.getVersion());
		naAdjectiveMeaningDTO.setMeaning(naAdjectiveMeaning.getMeaning());
		return naAdjectiveMeaningDTO;
	}
	
	public static NaAdjectiveMeaning map(NaAdjectiveMeaningDTO naAdjectiveMeaningDTO) {
		NaAdjectiveMeaning naAdjectiveMeaning = new NaAdjectiveMeaning();
		naAdjectiveMeaning.setId(naAdjectiveMeaningDTO.getId());
		naAdjectiveMeaning.setMeaningNumber(naAdjectiveMeaningDTO.getMeaningNumber());
		naAdjectiveMeaning.setVersion(naAdjectiveMeaningDTO.getVersion());
		naAdjectiveMeaning.setMeaning(naAdjectiveMeaningDTO.getMeaning());
		return naAdjectiveMeaning;
	}

}

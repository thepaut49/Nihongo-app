package com.thepaut49.nihongo.mapper.naadjective;

import com.thepaut49.nihongo.dto.naadjective.NaAdjectiveMeaningDTO;
import com.thepaut49.nihongo.model.naadjective.NaAdjectiveMeaning;


public class NaAdjectiveMeaningToDTOMapper {
	
	public static NaAdjectiveMeaningDTO map(NaAdjectiveMeaning naAdjectiveMeaning) {
		NaAdjectiveMeaningDTO naAdjectiveMeaningDTO = new NaAdjectiveMeaningDTO();
		naAdjectiveMeaningDTO.setNaAdjectiveId(naAdjectiveMeaning.getNaAdjectiveId());
		naAdjectiveMeaningDTO.setMeaningNumber(naAdjectiveMeaning.getMeaningNumber());
		naAdjectiveMeaningDTO.setVersion(naAdjectiveMeaning.getVersion());
		naAdjectiveMeaningDTO.setMeaning(naAdjectiveMeaning.getMeaning());
		return naAdjectiveMeaningDTO;
	}
	
	public static NaAdjectiveMeaning map(NaAdjectiveMeaningDTO naAdjectiveMeaningDTO) {
		NaAdjectiveMeaning naAdjectiveMeaning = new NaAdjectiveMeaning();
		naAdjectiveMeaning.setNaAdjectiveId(naAdjectiveMeaningDTO.getNaAdjectiveId());
		naAdjectiveMeaning.setMeaningNumber(naAdjectiveMeaningDTO.getMeaningNumber());
		naAdjectiveMeaning.setVersion(naAdjectiveMeaningDTO.getVersion());
		naAdjectiveMeaning.setMeaning(naAdjectiveMeaningDTO.getMeaning());
		return naAdjectiveMeaning;
	}

}

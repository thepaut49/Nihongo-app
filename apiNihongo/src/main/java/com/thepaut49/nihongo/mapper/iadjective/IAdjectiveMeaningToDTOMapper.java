package com.thepaut49.nihongo.mapper.iadjective;

import com.thepaut49.nihongo.dto.iadjective.IAdjectiveMeaningDTO;
import com.thepaut49.nihongo.model.iadjective.IAdjectiveMeaning;

public class IAdjectiveMeaningToDTOMapper {
	
	public static IAdjectiveMeaningDTO map(IAdjectiveMeaning iAdjectiveMeaning) {
		IAdjectiveMeaningDTO iAdjectiveMeaningDTO = new IAdjectiveMeaningDTO();
		iAdjectiveMeaningDTO.setIiAdjectiveId(iAdjectiveMeaning.getIAdjectiveId());
		iAdjectiveMeaningDTO.setMeaningNumber(iAdjectiveMeaning.getMeaningNumber());
		iAdjectiveMeaningDTO.setVersion(iAdjectiveMeaning.getVersion());
		iAdjectiveMeaningDTO.setMeaning(iAdjectiveMeaning.getMeaning());
		return iAdjectiveMeaningDTO;
	}
	
	public static IAdjectiveMeaning map(IAdjectiveMeaningDTO iAdjectiveMeaningDTO) {
		IAdjectiveMeaning iAdjectiveMeaning = new IAdjectiveMeaning();
		iAdjectiveMeaning.setIAdjectiveId(iAdjectiveMeaningDTO.getIiAdjectiveId());
		iAdjectiveMeaning.setMeaningNumber(iAdjectiveMeaningDTO.getMeaningNumber());
		iAdjectiveMeaning.setVersion(iAdjectiveMeaningDTO.getVersion());
		iAdjectiveMeaning.setMeaning(iAdjectiveMeaningDTO.getMeaning());
		return iAdjectiveMeaning;
	}

}

package com.thepaut49.nihongo.mapper.iadjective;

import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.iadjective.IAdjectiveDTO;
import com.thepaut49.nihongo.dto.iadjective.IAdjectiveMeaningDTO;
import com.thepaut49.nihongo.dto.iadjective.IAdjectivePronunciationDTO;
import com.thepaut49.nihongo.model.iadjective.IAdjective;
import com.thepaut49.nihongo.model.iadjective.IAdjectiveMeaning;
import com.thepaut49.nihongo.model.iadjective.IAdjectivePronunciation;

public class IAdjectiveToDTOMapper {
	
	public static IAdjectiveDTO map(IAdjective iAdjective) {
		IAdjectiveDTO iAdjectiveDTO = new IAdjectiveDTO();
		iAdjectiveDTO.setId(iAdjective.getId());
		iAdjectiveDTO.setKanjis(iAdjective.getKanjis());
		iAdjectiveDTO.setVersion(iAdjective.getVersion());
		iAdjectiveDTO.setNumberOfUse(iAdjective.getNumberOfUse());
		Set<IAdjectivePronunciationDTO> pronunciationsTemp = iAdjective.getPronunciations().stream().map(tempIAdjective -> IAdjectivePronunciationToDTOMapper.map(tempIAdjective)).collect(Collectors.toSet());
		iAdjectiveDTO.setPronunciations(pronunciationsTemp);
		Set<IAdjectiveMeaningDTO> meaningsTemp = iAdjective.getMeanings().stream().map(tempIAdjective -> IAdjectiveMeaningToDTOMapper.map(tempIAdjective)).collect(Collectors.toSet());
		iAdjectiveDTO.setMeanings(meaningsTemp);
		return iAdjectiveDTO;
	}
	
	public static IAdjective map(IAdjectiveDTO iAdjectiveDTO) {
		IAdjective iAdjective = new IAdjective();
		iAdjective.setId(iAdjectiveDTO.getId());
		iAdjective.setKanjis(iAdjectiveDTO.getKanjis());
		iAdjective.setVersion(iAdjectiveDTO.getVersion());
		iAdjective.setNumberOfUse(iAdjectiveDTO.getNumberOfUse());
		Set<IAdjectivePronunciation> pronunciationsTemp = iAdjectiveDTO.getPronunciations().stream().map(tempIAdjective -> IAdjectivePronunciationToDTOMapper.map(tempIAdjective)).collect(Collectors.toSet());
		iAdjective.setPronunciations(pronunciationsTemp);
		Set<IAdjectiveMeaning> meaningsTemp = iAdjectiveDTO.getMeanings().stream().map(tempIAdjective -> IAdjectiveMeaningToDTOMapper.map(tempIAdjective)).collect(Collectors.toSet());
		iAdjective.setMeanings(meaningsTemp);
		return iAdjective;
	}

}

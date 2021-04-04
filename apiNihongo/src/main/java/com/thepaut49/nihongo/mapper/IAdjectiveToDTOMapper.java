package com.thepaut49.nihongo.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.IAdjectiveDTO;
import com.thepaut49.nihongo.dto.IAdjectiveMeaningDTO;
import com.thepaut49.nihongo.model.IAdjective;
import com.thepaut49.nihongo.model.IAdjectiveMeaning;

public class IAdjectiveToDTOMapper {
	
	public static IAdjectiveDTO map(IAdjective iAdjective) {
		IAdjectiveDTO iAdjectiveDTO = new IAdjectiveDTO();
		iAdjectiveDTO.setId(iAdjective.getId());
		iAdjectiveDTO.setKanjis(iAdjective.getKanjis());
		iAdjectiveDTO.setVersion(iAdjective.getVersion());
		iAdjectiveDTO.setNumberOfUse(iAdjective.getNumberOfUse());
		iAdjectiveDTO.setPronunciation(new HashSet<String>());
		String[] pronunciations = iAdjective.getPronunciation().split(";");
		for(int index = 0; index < pronunciations.length; index++) {
			iAdjectiveDTO.getPronunciation().add(pronunciations[index].replace(";", ""));	
		}
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
		
		String pronunciationTemp = "";
		for(String pronunciation : iAdjectiveDTO.getPronunciation()) {
			pronunciationTemp += pronunciation + ";";	
		}
		iAdjective.setPronunciation(pronunciationTemp);
		
		Set<IAdjectiveMeaning> meaningsTemp = iAdjectiveDTO.getMeanings().stream().map(tempIAdjective -> IAdjectiveMeaningToDTOMapper.map(tempIAdjective)).collect(Collectors.toSet());
		iAdjective.setMeanings(meaningsTemp);
		return iAdjective;
	}

}

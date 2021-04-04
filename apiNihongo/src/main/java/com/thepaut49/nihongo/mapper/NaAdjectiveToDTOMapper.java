package com.thepaut49.nihongo.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.NaAdjectiveDTO;
import com.thepaut49.nihongo.dto.NaAdjectiveMeaningDTO;
import com.thepaut49.nihongo.model.NaAdjective;
import com.thepaut49.nihongo.model.NaAdjectiveMeaning;

public class NaAdjectiveToDTOMapper {
	
	public static NaAdjectiveDTO map(NaAdjective naAdjective) {
		NaAdjectiveDTO naAdjectiveDTO = new NaAdjectiveDTO();
		naAdjectiveDTO.setId(naAdjective.getId());
		naAdjectiveDTO.setKanjis(naAdjective.getKanjis());
		naAdjectiveDTO.setVersion(naAdjective.getVersion());
		naAdjectiveDTO.setNumberOfUse(naAdjective.getNumberOfUse());
		naAdjectiveDTO.setPronunciation(new HashSet<String>());
		String[] pronunciations = naAdjective.getPronunciation().split(";");
		for(int index = 0; index < pronunciations.length; index++) {
			naAdjectiveDTO.getPronunciation().add(pronunciations[index].replace(";", ""));	
		}
		Set<NaAdjectiveMeaningDTO> meaningsTemp = naAdjective.getMeanings().stream().map(tempNaAdj -> NaAdjectiveMeaningToDTOMapper.map(tempNaAdj)).collect(Collectors.toSet());
		naAdjectiveDTO.setMeanings(meaningsTemp);
		return naAdjectiveDTO;
	}
	
	public static NaAdjective map(NaAdjectiveDTO naAdjectiveDTO) {
		NaAdjective naAdjective = new NaAdjective();
		naAdjective.setId(naAdjectiveDTO.getId());
		naAdjective.setKanjis(naAdjectiveDTO.getKanjis());
		naAdjective.setVersion(naAdjectiveDTO.getVersion());
		naAdjective.setNumberOfUse(naAdjectiveDTO.getNumberOfUse());

		String pronunciationTemp = "";
		for(String pronunciation : naAdjectiveDTO.getPronunciation()) {
			pronunciationTemp += pronunciation + ";";	
		}
		naAdjective.setPronunciation(pronunciationTemp);
		Set<NaAdjectiveMeaning> meaningsTemp = naAdjectiveDTO.getMeanings().stream().map(tempAdj -> NaAdjectiveMeaningToDTOMapper.map(tempAdj)).collect(Collectors.toSet());
		naAdjective.setMeanings(meaningsTemp);	
		return naAdjective;
	}

}

package com.thepaut49.nihongo.mapper.naadjective;

import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.naadjective.NaAdjectiveDTO;
import com.thepaut49.nihongo.dto.naadjective.NaAdjectiveMeaningDTO;
import com.thepaut49.nihongo.dto.naadjective.NaAdjectivePronunciationDTO;
import com.thepaut49.nihongo.model.naadjective.NaAdjective;
import com.thepaut49.nihongo.model.naadjective.NaAdjectiveMeaning;
import com.thepaut49.nihongo.model.naadjective.NaAdjectivePronunciation;

public class NaAdjectiveToDTOMapper {
	
	public static NaAdjectiveDTO map(NaAdjective naAdjective) {
		NaAdjectiveDTO naAdjectiveDTO = new NaAdjectiveDTO();
		naAdjectiveDTO.setId(naAdjective.getId());
		naAdjectiveDTO.setKanjis(naAdjective.getKanjis());
		naAdjectiveDTO.setVersion(naAdjective.getVersion());
		naAdjectiveDTO.setNumberOfUse(naAdjective.getNumberOfUse());
		Set<NaAdjectivePronunciationDTO> pronunciationsTemp = naAdjective.getPronunciations().stream().map(tempNaAdjective -> NaAdjectivePronunciationToDTOMapper.map(tempNaAdjective)).collect(Collectors.toSet());
		naAdjectiveDTO.setPronunciations(pronunciationsTemp);
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
		Set<NaAdjectivePronunciation> pronunciationsTemp = naAdjectiveDTO.getPronunciations().stream().map(tempNaAdjective -> NaAdjectivePronunciationToDTOMapper.map(tempNaAdjective)).collect(Collectors.toSet());
		naAdjective.setPronunciations(pronunciationsTemp);
		Set<NaAdjectiveMeaning> meaningsTemp = naAdjectiveDTO.getMeanings().stream().map(tempAdj -> NaAdjectiveMeaningToDTOMapper.map(tempAdj)).collect(Collectors.toSet());
		naAdjective.setMeanings(meaningsTemp);	
		return naAdjective;
	}

}

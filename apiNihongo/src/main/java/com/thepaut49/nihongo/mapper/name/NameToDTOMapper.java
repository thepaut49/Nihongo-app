package com.thepaut49.nihongo.mapper.name;

import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.name.NameDTO;
import com.thepaut49.nihongo.dto.name.NameMeaningDTO;
import com.thepaut49.nihongo.dto.name.NamePronunciationDTO;
import com.thepaut49.nihongo.model.name.Name;
import com.thepaut49.nihongo.model.name.NameMeaning;
import com.thepaut49.nihongo.model.name.NamePronunciation;

public class NameToDTOMapper {
	
	public static NameDTO map(Name name) {
		NameDTO nameDTO = new NameDTO();
		nameDTO.setId(name.getId());
		nameDTO.setKanjis(name.getKanjis());
		nameDTO.setVersion(name.getVersion());
		nameDTO.setNumberOfUse(name.getNumberOfUse());
		Set<NamePronunciationDTO> pronunciationsTemp = name.getPronunciations().stream().map(tempName -> NamePronunciationToDTOMapper.map(tempName)).collect(Collectors.toSet());
		nameDTO.setPronunciations(pronunciationsTemp);
		Set<NameMeaningDTO> meaningsTemp = name.getMeanings().stream().map(tempName -> NameMeaningToDTOMapper.map(tempName)).collect(Collectors.toSet());
		nameDTO.setMeanings(meaningsTemp);
		return nameDTO;
	}
	
	public static Name map(NameDTO nameDTO) {
		Name name = new Name();
		name.setId(nameDTO.getId());
		name.setKanjis(nameDTO.getKanjis());
		name.setVersion(nameDTO.getVersion());
		name.setNumberOfUse(nameDTO.getNumberOfUse());
		Set<NamePronunciation> pronunciationsTemp = nameDTO.getPronunciations().stream().map(tempName -> NamePronunciationToDTOMapper.map(tempName)).collect(Collectors.toSet());
		name.setPronunciations(pronunciationsTemp);
		Set<NameMeaning> meaningsTemp = nameDTO.getMeanings().stream().map(tempName -> NameMeaningToDTOMapper.map(tempName)).collect(Collectors.toSet());
		name.setMeanings(meaningsTemp);
		return name;
	}

}

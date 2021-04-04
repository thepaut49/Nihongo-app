package com.thepaut49.nihongo.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.NameDTO;
import com.thepaut49.nihongo.dto.NameMeaningDTO;
import com.thepaut49.nihongo.model.Name;
import com.thepaut49.nihongo.model.NameMeaning;

public class NameToDTOMapper {
	
	public static NameDTO map(Name name) {
		NameDTO nameDTO = new NameDTO();
		nameDTO.setId(name.getId());
		nameDTO.setKanjis(name.getKanjis());
		nameDTO.setVersion(name.getVersion());
		nameDTO.setNumberOfUse(name.getNumberOfUse());
		nameDTO.setPronunciation(new HashSet<String>());
		String[] pronunciations = name.getPronunciation().split(";");
		for(int index = 0; index < pronunciations.length; index++) {
			nameDTO.getPronunciation().add(pronunciations[index].replace(";", ""));	
		}
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
		String pronunciationTemp = "";
		for(String pronunciation : nameDTO.getPronunciation()) {
			pronunciationTemp += pronunciation + ";";	
		}
		name.setPronunciation(pronunciationTemp);
		Set<NameMeaning> meaningsTemp = nameDTO.getMeanings().stream().map(tempName -> NameMeaningToDTOMapper.map(tempName)).collect(Collectors.toSet());
		name.setMeanings(meaningsTemp);
		return name;
	}

}

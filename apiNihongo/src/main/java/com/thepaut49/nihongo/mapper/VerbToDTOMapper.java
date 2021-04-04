package com.thepaut49.nihongo.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.VerbDTO;
import com.thepaut49.nihongo.dto.VerbMeaningDTO;
import com.thepaut49.nihongo.model.VerbMeaning;
import com.thepaut49.nihongo.model.Verb;

public class VerbToDTOMapper {
	
	public static VerbDTO map(Verb verb) {
		VerbDTO verbDTO = new VerbDTO();
		verbDTO.setId(verb.getId());
		verbDTO.setNeutralForm(verb.getNeutralForm());
		verbDTO.setGroupe(verb.getGroupe());
		verbDTO.setVersion(verb.getVersion());
		verbDTO.setNumberOfUse(verb.getNumberOfUse());
		verbDTO.setPronunciation(new HashSet<String>());
		String[] pronunciations = verb.getPronunciation().split(";");
		for(int index = 0; index < pronunciations.length; index++) {
			verbDTO.getPronunciation().add(pronunciations[index].replace(";", ""));	
		}
		Set<VerbMeaningDTO> meaningsTemp = verb.getMeanings().stream().map(tempVerb -> VerbMeaningToDTOMapper.map(tempVerb)).collect(Collectors.toSet());
		verbDTO.setMeanings(meaningsTemp);
		return verbDTO;
	}
	
	public static Verb map(VerbDTO verbDTO) {
		Verb verb = new Verb();
		verb.setId(verbDTO.getId());
		verb.setNeutralForm(verbDTO.getNeutralForm());
		verb.setGroupe(verbDTO.getGroupe());
		verb.setVersion(verbDTO.getVersion());
		verb.setNumberOfUse(verbDTO.getNumberOfUse());
		String pronunciationTemp = "";
		for(String pronunciation : verbDTO.getPronunciation()) {
			pronunciationTemp += pronunciation + ";";	
		}
		verb.setPronunciation(pronunciationTemp);
		Set<VerbMeaning> meaningsTemp = verbDTO.getMeanings().stream().map(tempVerb -> VerbMeaningToDTOMapper.map(tempVerb)).collect(Collectors.toSet());
		verb.setMeanings(meaningsTemp);
		return verb;
	}
}

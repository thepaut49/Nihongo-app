package com.thepaut49.nihongo.mapper.verb;

import java.util.Set;
import java.util.stream.Collectors;

import com.thepaut49.nihongo.dto.verb.VerbDTO;
import com.thepaut49.nihongo.dto.verb.VerbMeaningDTO;
import com.thepaut49.nihongo.dto.verb.VerbPronunciationDTO;
import com.thepaut49.nihongo.model.verb.Verb;
import com.thepaut49.nihongo.model.verb.VerbMeaning;
import com.thepaut49.nihongo.model.verb.VerbPronunciation;

public class VerbToDTOMapper {
	
	public static VerbDTO map(Verb verb) {
		VerbDTO verbDTO = new VerbDTO();
		verbDTO.setId(verb.getId());
		verbDTO.setNeutralForm(verb.getNeutralForm());
		verbDTO.setGroupe(verb.getGroupe());
		verbDTO.setVersion(verb.getVersion());
		verbDTO.setNumberOfUse(verb.getNumberOfUse());
		Set<VerbPronunciationDTO> pronunciationsTemp = verb.getPronunciations().stream().map(tempVerb -> VerbPronunciationToDTOMapper.map(tempVerb)).collect(Collectors.toSet());
		verbDTO.setPronunciations(pronunciationsTemp);
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
		Set<VerbPronunciation> pronunciationsTemp = verbDTO.getPronunciations().stream().map(tempVerb -> VerbPronunciationToDTOMapper.map(tempVerb)).collect(Collectors.toSet());
		verb.setPronunciations(pronunciationsTemp);
		Set<VerbMeaning> meaningsTemp = verbDTO.getMeanings().stream().map(tempVerb -> VerbMeaningToDTOMapper.map(tempVerb)).collect(Collectors.toSet());
		verb.setMeanings(meaningsTemp);
		return verb;
	}
}

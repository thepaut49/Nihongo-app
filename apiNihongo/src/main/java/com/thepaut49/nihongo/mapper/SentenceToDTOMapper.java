package com.thepaut49.nihongo.mapper;

import java.util.HashSet;

import com.thepaut49.nihongo.dto.SentenceDTO;
import com.thepaut49.nihongo.model.Sentence;

public class SentenceToDTOMapper {
	
	public static SentenceDTO map(Sentence sentence) {
		SentenceDTO sentenceDTO = new SentenceDTO();
		sentenceDTO.setId(sentence.getId());
		sentenceDTO.setKanjis(sentence.getKanjis());
		sentenceDTO.setVersion(sentence.getVersion());
		sentenceDTO.setPronunciation(new HashSet<String>());
		String[] pronunciations = sentence.getPronunciation().split(";");
		for(int index = 0; index < pronunciations.length; index++) {
			sentenceDTO.getPronunciation().add(pronunciations[index].replace(";", ""));	
		}
		sentenceDTO.setMeaning(new HashSet<String>());
		String[] meanings = sentence.getMeaning().split(";");
		for(int index = 0; index < meanings.length; index++) {
			sentenceDTO.getMeaning().add(meanings[index].replace(";", ""));	
		}
		sentenceDTO.setTopic(sentence.getTopic());
		return sentenceDTO;
	}
	
	public static Sentence map(SentenceDTO sentenceDTO) {
		Sentence sentence = new Sentence();
		sentence.setId(sentenceDTO.getId());
		sentence.setKanjis(sentenceDTO.getKanjis());
		sentence.setVersion(sentenceDTO.getVersion());
		String pronunciationTemp = "";
		for(String pronunciation : sentenceDTO.getPronunciation()) {
			pronunciationTemp += pronunciation + ";";	
		}
		sentence.setPronunciation(pronunciationTemp);
		String meaningTemp = "";
		for(String meaning : sentenceDTO.getMeaning()) {
			meaningTemp += meaning + ";";	
		}
		sentence.setMeaning(meaningTemp);	
		sentence.setTopic(sentenceDTO.getTopic());
		return sentence;
	}

}

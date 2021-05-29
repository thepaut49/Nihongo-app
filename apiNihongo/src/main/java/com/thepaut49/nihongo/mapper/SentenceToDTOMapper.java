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
		sentenceDTO.setPronunciation(sentence.getPronunciation());
		sentenceDTO.setMeaning(sentence.getMeaning());
		sentenceDTO.setTopic(sentence.getTopic());
		return sentenceDTO;
	}
	
	public static Sentence map(SentenceDTO sentenceDTO) {
		Sentence sentence = new Sentence();
		sentence.setId(sentenceDTO.getId());
		sentence.setKanjis(sentenceDTO.getKanjis());
		sentence.setVersion(sentenceDTO.getVersion());
		sentence.setPronunciation(sentenceDTO.getPronunciation());
		sentence.setMeaning(sentenceDTO.getMeaning());
		sentence.setTopic(sentenceDTO.getTopic());
		return sentence;
	}

}

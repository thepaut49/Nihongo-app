package com.thepaut49.nihongo.mapper.word;

import com.thepaut49.nihongo.dto.word.WordPronunciationDTO;
import com.thepaut49.nihongo.model.word.WordPronunciation;



public class WordPronunciationToDTOMapper {
	
	public static WordPronunciationDTO map(WordPronunciation wordPronunciation) {
		WordPronunciationDTO wordPronunciationDTO = new WordPronunciationDTO();
		wordPronunciationDTO.setId(wordPronunciation.getId());
		wordPronunciationDTO.setPronunciationNumber(wordPronunciation.getPronunciationNumber());
		wordPronunciationDTO.setVersion(wordPronunciation.getVersion());
		wordPronunciationDTO.setPronunciation(wordPronunciation.getPronunciation());
		return wordPronunciationDTO;
	}
	
	public static WordPronunciation map(WordPronunciationDTO wordPronunciationDTO) {
		WordPronunciation wordPronunciation = new WordPronunciation();
		wordPronunciation.setId(wordPronunciationDTO.getId());
		wordPronunciation.setPronunciationNumber(wordPronunciationDTO.getPronunciationNumber());
		wordPronunciation.setVersion(wordPronunciationDTO.getVersion());
		wordPronunciation.setPronunciation(wordPronunciationDTO.getPronunciation());
		return wordPronunciation;
	}

}

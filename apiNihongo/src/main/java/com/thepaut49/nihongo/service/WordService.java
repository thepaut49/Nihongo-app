package com.thepaut49.nihongo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thepaut49.nihongo.dto.word.WordCriteriaDTO;
import com.thepaut49.nihongo.exception.ResourceAlreadyExistException;
import com.thepaut49.nihongo.model.word.Word;
import com.thepaut49.nihongo.repository.word.WordRepository;

@Service
@Transactional
public class WordService {
	
	@Autowired
	private WordRepository wordRepository;
	
	public Word createWord(Word newWord) {
		if (!wordRepository.existsByKanjis(newWord.getKanjis())) {
			newWord.setNumberOfUse(1);
			newWord.getMeanings().stream().forEach(meaning -> meaning.setWord(newWord));
			newWord.getPronunciations().stream().forEach(pronunciation -> pronunciation.setWord(newWord));
			return wordRepository.save(newWord);
		}
		else {
			throw new ResourceAlreadyExistException("Word " + newWord.getKanjis() + " already exist !");
		}
	}
	
	public Word updateWord(Word word) {
		if (word != null) {
			word.getMeanings().stream().forEach(meaning -> meaning.setWord(word));
			word.getPronunciations().stream().forEach(pronunciation -> pronunciation.setWord(word));
			return wordRepository.save(word);
		}
		else {
			return null;
		}
	}

	public void delete(Long id) {
		Optional<Word> word = wordRepository.findById(id);
		if (!word.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Word with id : " + id );
		}
		wordRepository.deleteById(id);
	}

	public Word findById(Long id) {
		Optional<Word> word = wordRepository.findById(id);
		if (!word.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Word with id : " + id );
		}
		return word.get();
	}
	
	public List<Word> findAll() {
		return wordRepository.findAll();
	}
	
	public List<Word> findWithCriteria(WordCriteriaDTO criteria) {
		String kanjis = criteria.getKanjis();
		String meaning = criteria.getMeaning();
		String pronunciation = criteria.getPronunciation();
		return wordRepository.findWithCriteria(kanjis, pronunciation, meaning);
	}
	
	public Word updateWordNumberOfUse(Long id) {
		Word word = wordRepository.findById(id).get();
		word.setNumberOfUse(word.getNumberOfUse() + 1);
		return wordRepository.save(word);
	}

	public List<Word> findMostUsedWords(Integer quantity) {
		return wordRepository.findMostUsedWords(quantity);
	}

	public Word findByKanjis(String kanjis) {
		return wordRepository.findByKanjis( kanjis);
	}

}

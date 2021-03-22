package com.thepaut49.nihongo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.thepaut49.nihongo.dto.SentenceCriteriaDTO;
import com.thepaut49.nihongo.exception.ResourceAlreadyExistException;
import com.thepaut49.nihongo.model.Sentence;
import com.thepaut49.nihongo.repository.SentenceRepository;

@Service
public class SentenceService {
	
	@Autowired
	private SentenceRepository sentenceRepository;
	
	public Sentence createSentence(Sentence newSentence) {
		if (!sentenceRepository.existsByKanjis(newSentence.getKanjis())) {
			return sentenceRepository.save(newSentence);
		}
		else {
			throw new ResourceAlreadyExistException("Sentence " + newSentence.getKanjis() + " already exist !");
		}
	}
	
	public Sentence updateSentence(Sentence sentence) {
		if (sentence != null) {
			return sentenceRepository.save(sentence);
		}
		else {
			return null;
		}
	}

	public void delete(Integer id) {
		Optional<Sentence> sentence = sentenceRepository.findById(id);
		if (!sentence.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Sentence with id : " + id );
		}
		sentenceRepository.deleteById(id);
	}

	public Sentence findById(Integer id) {
		Optional<Sentence> sentence = sentenceRepository.findById(id);
		if (!sentence.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Sentence with id : " + id );
		}
		return sentence.get();
	}
	
	public List<Sentence> findAll() {
		return sentenceRepository.findAll();
	}
	
	public List<Sentence> findWithCriteria(SentenceCriteriaDTO criteria) {
		String kanjis = criteria.getKanjis();
		String meaning = criteria.getMeaning();
		String pronunciation = criteria.getPronunciation();
		String topic = criteria.getTopic();
		return sentenceRepository.findWithCriteria(kanjis, pronunciation, meaning,topic);
	}
	

	public Sentence findByKanjis(String kanjis) {
		return sentenceRepository.findByKanjis( kanjis);
	}

}

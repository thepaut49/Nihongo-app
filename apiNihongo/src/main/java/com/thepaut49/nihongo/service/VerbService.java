package com.thepaut49.nihongo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thepaut49.nihongo.dto.verb.VerbCriteriaDTO;
import com.thepaut49.nihongo.exception.ResourceAlreadyExistException;
import com.thepaut49.nihongo.model.verb.Verb;
import com.thepaut49.nihongo.repository.verb.VerbRepository;

@Service
@Transactional
public class VerbService {
	
	@Autowired
	private VerbRepository verbRepository;
	
	public Verb createVerb(Verb newVerb) {
		if (!verbRepository.existsByNeutralForm(newVerb.getNeutralForm())) {
			newVerb.setNumberOfUse(1);
			newVerb.getMeanings().stream().forEach(meaning -> meaning.setVerb(newVerb));
			newVerb.getPronunciations().stream().forEach(pronunciation -> pronunciation.setVerb(newVerb));
			return verbRepository.save(newVerb);
		}
		else {
			throw new ResourceAlreadyExistException("Verb " + newVerb.getNeutralForm() + " already exist !");
		}
	}
	
	public Verb updateVerb(Verb verb) {
		if (verb != null) {
			verb.getMeanings().stream().forEach(meaning -> meaning.setVerb(verb));
			verb.getPronunciations().stream().forEach(pronunciation -> pronunciation.setVerb(verb));
			Verb updatedVerb = verbRepository.save(verb);
			return updatedVerb;
		}
		else {
			return null;
		}
	}

	public void delete(Long id) {
		Optional<Verb> verb = verbRepository.findById(id);
		if (!verb.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Verb with id : " + id );
		}
		verbRepository.deleteById(id);
	}

	public Verb findById(Long id) {
		Optional<Verb> verb = verbRepository.findById(id);
		if (!verb.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Verb with id : " + id );
		}
		return verb.get();
	}
	
	public List<Verb> findAll() {
		return verbRepository.findAll();
	}
	
	public List<Verb> findWithCriteria(VerbCriteriaDTO criteria) {
		String neutralForm = criteria.getNeutralForm();
		String meaning = criteria.getMeaning();
		String pronunciation = criteria.getPronunciation();
		String group = criteria.getGroupe();	
		return verbRepository.findWithCriteria(neutralForm, pronunciation, meaning, group);
	}
	
	public Verb updateVerbNumberOfUse(Long id) {
		Verb verb = verbRepository.findById(id).get();
		verb.setNumberOfUse(verb.getNumberOfUse() + 1);
		return verbRepository.save(verb);
	}

	public List<Verb> findMostUsedVerbs(Integer quantity) {
		return verbRepository.findMostUsedVerbs(quantity);
	}

	public Verb findByNeutralForm(String neutralForm) {
		return verbRepository.findByNeutralForm( neutralForm);
	}

}

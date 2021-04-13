package com.thepaut49.nihongo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thepaut49.nihongo.exception.ResourceAlreadyExistException;
import com.thepaut49.nihongo.model.suffix.Suffix;
import com.thepaut49.nihongo.repository.SuffixRepository;

@Service
@Transactional
public class SuffixService {
	
	@Autowired
	private SuffixRepository suffixRepository;
	
	public Suffix createSuffix(Suffix newSuffix) {
		if (!suffixRepository.existsByKanjis(newSuffix.getKanjis())) {
			return suffixRepository.save(newSuffix);
		}
		else {
			throw new ResourceAlreadyExistException("Suffix " + newSuffix.getKanjis() + " already exist !");
		}
	}
	
	public Suffix updateSuffix(Suffix suffix) {
		if (suffix != null) {
			return suffixRepository.save(suffix);
		}
		else {
			return null;
		}
	}

	public void delete(Integer id) {
		Optional<Suffix> suffix = suffixRepository.findById(id);
		if (!suffix.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Suffix with id : " + id );
		}
		suffixRepository.deleteById(id);
	}

	public Suffix findById(Integer id) {
		Optional<Suffix> suffix = suffixRepository.findById(id);
		if (!suffix.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Suffix with id : " + id );
		}
		return suffix.get();
	}
	
	public List<Suffix> findAll() {
		return suffixRepository.findAll();
	}
	
	public Suffix findByKanjis(String kanjis) {
		return suffixRepository.findByKanjis( kanjis);
	}

}

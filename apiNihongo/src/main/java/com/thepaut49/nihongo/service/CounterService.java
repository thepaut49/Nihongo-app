package com.thepaut49.nihongo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thepaut49.nihongo.dto.counter.CounterCriteriaDTO;
import com.thepaut49.nihongo.exception.ResourceAlreadyExistException;
import com.thepaut49.nihongo.model.counter.Counter;
import com.thepaut49.nihongo.repository.counter.CounterRepository;

@Service
@Transactional
public class CounterService {
	
	@Autowired
	private CounterRepository counterRepository;
	
	public Counter createCounter(Counter newCounter) {
		if (!counterRepository.existsByKanjis(newCounter.getKanjis())) {
			newCounter.setNumberOfUse(1);
			newCounter.getPronunciations().stream().forEach(pronunciation -> pronunciation.setCounter(newCounter));
			return counterRepository.save(newCounter);
		}
		else {
			throw new ResourceAlreadyExistException("Counter " + newCounter.getKanjis() + " already exist !");
		}
	}
	
	public Counter updateCounter(Counter counter) {
		if (counter != null) {
			counter.getPronunciations().stream().forEach(pronunciation -> pronunciation.setCounter(counter));
			return counterRepository.save(counter);
		}
		else {
			return null;
		}
	}

	public void delete(Long id) {
		Optional<Counter> counter = counterRepository.findById(id);
		if (!counter.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Counter with id : " + id );
		}
		counterRepository.deleteById(id);
	}

	public Counter findById(Long id) {
		Optional<Counter> counter = counterRepository.findById(id);
		if (!counter.isPresent()) {
			throw new ResourceNotFoundException("Could not found the Counter with id : " + id );
		}
		return counter.get();
	}
	
	public List<Counter> findAll() {
		return counterRepository.findAll();
	}
	
	public List<Counter> findWithCriteria(CounterCriteriaDTO criteria) {
		String kanjis = criteria.getKanjis();
		String use = criteria.getUse();
		String pronunciation = criteria.getPronunciation();
		return counterRepository.findWithCriteria(kanjis, pronunciation, use);
	}
	
	public Counter updateCounterNumberOfUse(Long id) {
		Counter counter = counterRepository.findById(id).get();
		counter.setNumberOfUse(counter.getNumberOfUse() + 1);
		return counterRepository.save(counter);
	}

	public List<Counter> findMostUsedCounters(Integer quantity) {
		return counterRepository.findMostUsedCounters(quantity);
	}

	public Counter findByKanjis(String kanjis) {
		return counterRepository.findByKanjis( kanjis);
	}

}

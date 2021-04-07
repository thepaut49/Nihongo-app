package com.thepaut49.nihongo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.thepaut49.nihongo.dto.CounterCriteriaDTO;
import com.thepaut49.nihongo.dto.CounterDTO;
import com.thepaut49.nihongo.dto.ObjectDTO;
import com.thepaut49.nihongo.mapper.CounterToDTOMapper;
import com.thepaut49.nihongo.mapper.ObjectDTOMapper;
import com.thepaut49.nihongo.model.Counter;
import com.thepaut49.nihongo.service.CounterService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/counters")
public class CounterController {

	@Autowired
	private CounterService counterService;

	@PostMapping("/create")
	public CounterDTO createCounter( @RequestBody CounterDTO counterDTO) {
		Counter newCounter = CounterToDTOMapper.map(counterDTO);
		return CounterToDTOMapper.map(counterService.createCounter(newCounter));
	}

	@PutMapping("/{id}")
	public CounterDTO updateCounter( @RequestBody CounterDTO counterDTO, @PathVariable Integer id) {
		Counter updatedCounter = CounterToDTOMapper.map(counterDTO);  
		updatedCounter.setId(id);
		return CounterToDTOMapper.map(counterService.updateCounter(updatedCounter));
	}
	
	@PatchMapping("/{id}")
	public CounterDTO updateCounterNumberOfUse( @PathVariable Integer id) {
		return CounterToDTOMapper.map(counterService.updateCounterNumberOfUse(id));
	}


	@DeleteMapping(value = "/{id}")
	public String delete(@PathVariable Integer id) {
		counterService.delete(id);
		return "Counter deleted !";
	}

	@GetMapping(value = "/{id}")
	public CounterDTO findById( @PathVariable Integer id) {
		return CounterToDTOMapper.map(counterService.findById(id));
	}
	
	@GetMapping(value = "/findByKanjis/{kanjis}")
	public CounterDTO findByNeutralForm( @PathVariable String kanjis) {
		return CounterToDTOMapper.map(counterService.findByKanjis(kanjis));
	}

	@GetMapping("/all")
	public List<CounterDTO> getAllCounters() {
		List<Counter> counters = counterService.findAll();
		return counters
				.stream()
				.map(counter -> CounterToDTOMapper.map(counter))
				.collect(Collectors.toList());
	}

	@GetMapping("/findWithCriteria")
	@ResponseBody
	public List<CounterDTO> getAllCountersAccortingToCriteria( @RequestParam(required = false) String kanjis,@RequestParam(required = false) String pronunciation, @RequestParam(required = false) String use ) { 
		CounterCriteriaDTO counterCriteriaDTO = new CounterCriteriaDTO();
		counterCriteriaDTO.setKanjis(kanjis);
		counterCriteriaDTO.setPronunciation(pronunciation);
		counterCriteriaDTO.setUse(use);
		
		List<Counter> counters = counterService.findWithCriteria(counterCriteriaDTO);
		return counters
				.stream()
				.map(lCounter -> CounterToDTOMapper.map(lCounter))
				.collect(Collectors.toList());
	}
	
	
	@GetMapping("/findMostUsedCounters/{quantity}")
	public List<ObjectDTO> findMostUsedCounters(@PathVariable Integer quantity) { 
		List<Counter> counters = counterService.findMostUsedCounters(quantity);
		return counters
				.stream()
				.map(counter -> ObjectDTOMapper.map(counter))
				.collect(Collectors.toList());
	}


}

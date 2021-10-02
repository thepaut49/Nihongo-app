package com.thepaut49.nihongo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thepaut49.nihongo.dto.suffix.SuffixDTO;
import com.thepaut49.nihongo.mapper.suffix.SuffixToDTOMapper;
import com.thepaut49.nihongo.model.suffix.Suffix;
import com.thepaut49.nihongo.service.SuffixService;

import javax.annotation.security.RolesAllowed;

@CrossOrigin(origins = "http://nihongo-tool.ovh", maxAge = 3600)
@RestController
@RequestMapping("/suffixs")
public class SuffixController {

	@Autowired
	private SuffixService suffixService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create")
	public SuffixDTO createSuffix(@RequestBody SuffixDTO suffixDTO) {
		Suffix newSuffix = SuffixToDTOMapper.map(suffixDTO);
		return SuffixToDTOMapper.map(suffixService.createSuffix(newSuffix));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public SuffixDTO updateSuffix(@RequestBody SuffixDTO suffixDTO, @PathVariable Long id) {
		Suffix updatedSuffix = SuffixToDTOMapper.map(suffixDTO);
		updatedSuffix.setId(id);
		return SuffixToDTOMapper.map(suffixService.updateSuffix(updatedSuffix));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(value = "/{id}")
	public String delete(@PathVariable Long id) {
		suffixService.delete(id);
		return "Suffix deleted !";
	}

	@GetMapping(value = "/{id}")
	public SuffixDTO findById(@PathVariable Long id) {
		return SuffixToDTOMapper.map(suffixService.findById(id));
	}

	@GetMapping(value = "/findByKanjis/{kanjis}")
	public SuffixDTO findByNeutralForm(@PathVariable String kanjis) {
		return SuffixToDTOMapper.map(suffixService.findByKanjis(kanjis));
	}

	@GetMapping("/all")
	public List<SuffixDTO> getAllSuffixs() {
		List<Suffix> suffixs = suffixService.findAll();
		return suffixs.stream().map(suffix -> SuffixToDTOMapper.map(suffix)).collect(Collectors.toList());
	}
}

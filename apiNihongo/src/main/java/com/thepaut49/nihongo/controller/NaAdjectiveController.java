package com.thepaut49.nihongo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.thepaut49.nihongo.dto.ObjectDTO;
import com.thepaut49.nihongo.dto.naadjective.NaAdjectiveCriteriaDTO;
import com.thepaut49.nihongo.dto.naadjective.NaAdjectiveDTO;
import com.thepaut49.nihongo.mapper.ObjectDTOMapper;
import com.thepaut49.nihongo.mapper.naadjective.NaAdjectiveToDTOMapper;
import com.thepaut49.nihongo.model.naadjective.NaAdjective;
import com.thepaut49.nihongo.service.NaAdjectiveService;

import javax.annotation.security.RolesAllowed;

@CrossOrigin(origins = "http://FRONT_HOST_NAME", maxAge = 3600)
@RestController
@RequestMapping("/naAdjectives")
public class NaAdjectiveController {

	@Autowired
	private NaAdjectiveService naAdjectiveService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create")
	public NaAdjectiveDTO createNaAdjective(@RequestBody NaAdjectiveDTO naAdjectiveDTO) {
		NaAdjective newNaAdjective = NaAdjectiveToDTOMapper.map(naAdjectiveDTO);
		return NaAdjectiveToDTOMapper.map(naAdjectiveService.createNaAdjective(newNaAdjective));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public NaAdjectiveDTO updateNaAdjective(@RequestBody NaAdjectiveDTO naAdjectiveDTO, @PathVariable Long id) {
		NaAdjective updatedNaAdjective = NaAdjectiveToDTOMapper.map(naAdjectiveDTO);
		updatedNaAdjective.setId(id);
		return NaAdjectiveToDTOMapper.map(naAdjectiveService.updateNaAdjective(updatedNaAdjective));
	}

	@PatchMapping("/{id}")
	public NaAdjectiveDTO updateNaAdjectiveNumberOfUse(@PathVariable Long id) {
		return NaAdjectiveToDTOMapper.map(naAdjectiveService.updateNaAdjectiveNumberOfUse(id));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(value = "/{id}")
	public String delete(@PathVariable Long id) {
		naAdjectiveService.delete(id);
		return "NaAdjective deleted !";
	}

	@GetMapping(value = "/{id}")
	public NaAdjectiveDTO findById(@PathVariable Long id) {
		return NaAdjectiveToDTOMapper.map(naAdjectiveService.findById(id));
	}

	@GetMapping(value = "/findByKanjis/{kanjis}")
	public NaAdjectiveDTO findByNeutralForm(@PathVariable String kanjis) {
		return NaAdjectiveToDTOMapper.map(naAdjectiveService.findByKanjis(kanjis));
	}

	@GetMapping("/all")
	public List<NaAdjectiveDTO> getAllNaAdjectives() {
		List<NaAdjective> naAdjectives = naAdjectiveService.findAll();
		return naAdjectives.stream().map(naAdjective -> NaAdjectiveToDTOMapper.map(naAdjective))
				.collect(Collectors.toList());
	}

	@GetMapping("/findWithCriteria")
	@ResponseBody
	public List<NaAdjectiveDTO> getAllNaAdjectivesAccortingToCriteria(@RequestParam(required = false) String kanjis,
			@RequestParam(required = false) String pronunciation, @RequestParam(required = false) String meaning) {
		NaAdjectiveCriteriaDTO naAdjectiveCriteriaDTO = new NaAdjectiveCriteriaDTO();
		naAdjectiveCriteriaDTO.setKanjis(kanjis);
		naAdjectiveCriteriaDTO.setPronunciation(pronunciation);
		naAdjectiveCriteriaDTO.setMeaning(meaning);

		List<NaAdjective> naAdjectives = naAdjectiveService.findWithCriteria(naAdjectiveCriteriaDTO);
		return naAdjectives.stream().map(lNaAdjective -> NaAdjectiveToDTOMapper.map(lNaAdjective))
				.collect(Collectors.toList());
	}

	@GetMapping("/findMostUsedNaAdjectives/{quantity}")
	public List<ObjectDTO> findMostUsedNaAdjectives(@PathVariable Integer quantity) {
		List<NaAdjective> naAdjectives = naAdjectiveService.findMostUsedNaAdjectives(quantity);
		return naAdjectives.stream().map(naAdjective -> ObjectDTOMapper.map(naAdjective)).collect(Collectors.toList());
	}
}

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.thepaut49.nihongo.dto.SentenceCriteriaDTO;
import com.thepaut49.nihongo.dto.SentenceDTO;
import com.thepaut49.nihongo.mapper.SentenceToDTOMapper;
import com.thepaut49.nihongo.model.Sentence;
import com.thepaut49.nihongo.service.SentenceService;

import javax.annotation.security.RolesAllowed;

@CrossOrigin(origins = "http://nihongo-tool.ovh", maxAge = 3600)
@RestController
@RequestMapping("/sentences")
public class SentenceController {

	@Autowired
	private SentenceService sentenceService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create")
	public SentenceDTO createSentence(@RequestBody SentenceDTO sentenceDTO) {
		Sentence newSentence = SentenceToDTOMapper.map(sentenceDTO);
		return SentenceToDTOMapper.map(sentenceService.createSentence(newSentence));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public SentenceDTO updateSentence(@RequestBody SentenceDTO sentenceDTO, @PathVariable Long id) {
		Sentence updatedSentence = SentenceToDTOMapper.map(sentenceDTO);
		updatedSentence.setId(id);
		return SentenceToDTOMapper.map(sentenceService.updateSentence(updatedSentence));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(value = "/{id}")
	public String delete(@PathVariable Long id) {
		sentenceService.delete(id);
		return "Sentence deleted !";
	}

	@GetMapping(value = "/{id}")
	public SentenceDTO findById(@PathVariable Long id) {
		return SentenceToDTOMapper.map(sentenceService.findById(id));
	}

	@GetMapping(value = "/findByKanjis/{kanjis}")
	public SentenceDTO findByKanjis(@PathVariable String kanjis) {
		return SentenceToDTOMapper.map(sentenceService.findByKanjis(kanjis));
	}

	@GetMapping("/all")
	public List<SentenceDTO> getAllSentences() {
		List<Sentence> sentences = sentenceService.findAll();
		return sentences.stream().map(sentence -> SentenceToDTOMapper.map(sentence)).collect(Collectors.toList());
	}

	@GetMapping("/findWithCriteria")
	@ResponseBody
	public List<SentenceDTO> getAllSentencesAccortingToCriteria(@RequestParam(required = false) String kanjis,
			@RequestParam(required = false) String pronunciation, @RequestParam(required = false) String meaning,
			@RequestParam(required = false) String topic) {
		SentenceCriteriaDTO sentenceCriteriaDTO = new SentenceCriteriaDTO();
		sentenceCriteriaDTO.setKanjis(kanjis);
		sentenceCriteriaDTO.setPronunciation(pronunciation);
		sentenceCriteriaDTO.setMeaning(meaning);
		sentenceCriteriaDTO.setTopic(topic);

		List<Sentence> sentences = sentenceService.findWithCriteria(sentenceCriteriaDTO);
		return sentences.stream().map(lSentence -> SentenceToDTOMapper.map(lSentence)).collect(Collectors.toList());
	}
}

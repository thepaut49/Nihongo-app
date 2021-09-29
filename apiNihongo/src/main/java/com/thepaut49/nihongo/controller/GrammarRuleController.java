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

import com.thepaut49.nihongo.dto.GrammarRuleDTO;
import com.thepaut49.nihongo.mapper.GrammarRuleToDTOMapper;
import com.thepaut49.nihongo.model.GrammarRule;
import com.thepaut49.nihongo.service.GrammarRuleService;

import javax.annotation.security.RolesAllowed;

@CrossOrigin(origins = "http://FRONT_HOST_NAME", maxAge = 3600)
@RestController
@RequestMapping("/grammarRules")
public class GrammarRuleController {

	@Autowired
	private GrammarRuleService grammarRuleService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/create")
	public GrammarRuleDTO createGrammarRule(@RequestBody GrammarRuleDTO grammarRuleDTO) {
		GrammarRule newGrammarRule = GrammarRuleToDTOMapper.map(grammarRuleDTO);
		return GrammarRuleToDTOMapper.map(grammarRuleService.createGrammarRule(newGrammarRule));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public GrammarRuleDTO updateGrammarRule(@RequestBody GrammarRuleDTO grammarRuleDTO, @PathVariable Long id) {
		GrammarRule updatedGrammarRule = GrammarRuleToDTOMapper.map(grammarRuleDTO);
		updatedGrammarRule.setId(id);
		return GrammarRuleToDTOMapper.map(grammarRuleService.updateGrammarRule(updatedGrammarRule));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(value = "/{id}")
	public String delete(@PathVariable Long id) {
		grammarRuleService.delete(id);
		return "GrammarRule deleted !";
	}

	@GetMapping(value = "/{id}")
	public GrammarRuleDTO findById(@PathVariable Long id) {
		return GrammarRuleToDTOMapper.map(grammarRuleService.findById(id));
	}

	@GetMapping(value = "/findByTitle/{title}")
	public GrammarRuleDTO findByTitle(@PathVariable String title) {
		return GrammarRuleToDTOMapper.map(grammarRuleService.findByTitle(title));
	}

	@GetMapping("/all")
	public List<GrammarRuleDTO> getAllGrammarRules() {
		List<GrammarRule> grammarRules = grammarRuleService.findAll();
		return grammarRules.stream().map(grammarRule -> GrammarRuleToDTOMapper.map(grammarRule))
				.collect(Collectors.toList());
	}
}

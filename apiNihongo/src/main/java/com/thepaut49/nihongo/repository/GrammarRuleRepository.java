package com.thepaut49.nihongo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.GrammarRule;

public interface GrammarRuleRepository extends JpaRepository<GrammarRule, Long> {
	
	boolean existsByTitle(String title);

	GrammarRule findByTitle(String title);
}

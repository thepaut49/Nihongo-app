package com.thepaut49.nihongo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thepaut49.nihongo.model.verb.VerbMeaning;


public interface VerbMeaningRepository extends JpaRepository<VerbMeaning, Long> {

}
